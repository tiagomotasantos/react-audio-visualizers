import { AudioVisualizerLoader } from './AudioVisualizerLoader';

export class AudioVisualizerLoaderArrayBuffer extends AudioVisualizerLoader {
  loadAudio(audio: ArrayBuffer) {
    return Promise.resolve(audio);
  } 
}
