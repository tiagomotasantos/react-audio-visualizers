import { AudioVisualizerLoader } from './AudioVisualizerLoader';

export class AudioVisualizerLoaderFile extends AudioVisualizerLoader {
  loadAudio(audio: File) {
    return audio.arrayBuffer();
  } 
}
