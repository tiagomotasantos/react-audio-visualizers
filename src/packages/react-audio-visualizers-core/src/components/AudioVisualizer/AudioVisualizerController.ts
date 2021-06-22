import { AudioVisualizerContext } from './AudioVisualizerProvider';

export class AudioVisualizerController {
  private audioContext: AudioContext;
  private audioSource: AudioBufferSourceNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private analyser: AnalyserNode;
  private context: AudioVisualizerContext;
  private startedAt: number = 0;
  private pausedAt: number = 0;

  constructor(context: AudioVisualizerContext) {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.85;
    this.context = context;
    this.analyser.connect(this.audioContext.destination);
  }

  async loadAudio(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    
    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

    this.context.setAudioContext(this.audioContext);
    this.context.setAnalyser(this.analyser);
  }

  play() {
    const offset = this.pausedAt;

    this.audioSource = this.audioContext.createBufferSource();
    this.audioSource.connect(this.analyser);
    this.audioSource.buffer = this.audioBuffer;
    this.audioSource.start(0, offset);
    this.startedAt = this.audioContext.currentTime - offset;
  }

  stop() {
    const elapsed = this.audioContext.currentTime - this.startedAt;

    this.pausedAt = elapsed;

    if (this.audioSource) {
      this.audioSource.disconnect();
      this.audioSource.stop();
    }
  }

  clean() {
    this.audioContext.close();
  }
}