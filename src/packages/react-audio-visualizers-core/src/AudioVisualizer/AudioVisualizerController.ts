import { Audio, AudioVisualizerStatus } from '../types';
import { AudioVisualizerContext } from './AudioVisualizerProvider';
import { AudioVisualizerEvents, emitter } from './events';
import { AudioVisualizerLoaderFactory } from './loaders';

const DEFAULT_SMOOTHING_TIME_CONSTANT = 0.85;
const DEFAULT_FFT_SIZE = 2048;
export class AudioVisualizerController {
  private audioContext: AudioContext;
  private audioSource: AudioBufferSourceNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private gain: GainNode;
  private analyser: AnalyserNode;
  private context: AudioVisualizerContext;
  private startedAt: number = 0;
  private pausedAt: number = 0;

  constructor(
    context: AudioVisualizerContext,
    smoothingTimeConstant = DEFAULT_SMOOTHING_TIME_CONSTANT,
    fftSize = DEFAULT_FFT_SIZE,
  ) {
    this.audioContext = new AudioContext();
    this.gain = this.audioContext.createGain();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = smoothingTimeConstant;
    this.analyser.fftSize = fftSize;
    this.context = context;
    this.gain.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  async loadAudio(audio: Audio, setLoading: (loading: boolean) => void) {
    try {
      setLoading(true);
      emitter.emit(AudioVisualizerEvents.loading);

      const loader = AudioVisualizerLoaderFactory.newAudioVisualizerLoader(audio);
      const arrayBuffer = await loader.loadAudio(audio);
      
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
  
      this.context.setAudioContext(this.audioContext);
      this.context.setAnalyser(this.analyser);
      emitter.emit(AudioVisualizerEvents.loaded);
    } catch (error) {
      emitter.emit(AudioVisualizerEvents.error, error);
    } finally {
      setLoading(false);
    }
  }

  play() {
    const offset = this.pausedAt;

    this.audioSource = this.audioContext.createBufferSource();
    this.audioSource.connect(this.gain);
    this.audioSource.buffer = this.audioBuffer;
    this.audioSource.start(0, offset);
    this.startedAt = this.audioContext.currentTime - offset;
    this.context.setStatus(AudioVisualizerStatus.playing);
  }

  pause() {
    const elapsed = this.audioContext.currentTime - this.startedAt;

    this.pausedAt = elapsed;

    if (this.audioSource) {
      this.audioSource.disconnect();
      this.audioSource.stop();
    }

    this.context.setStatus(AudioVisualizerStatus.paused);
  }

  setVolume(volume: number) {
    this.gain.gain.value = volume;
  }

  clean() {
    this.audioContext.close();
  }
}