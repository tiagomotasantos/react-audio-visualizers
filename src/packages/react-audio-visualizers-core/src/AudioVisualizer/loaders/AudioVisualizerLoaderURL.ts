import { AudioVisualizerLoader } from './AudioVisualizerLoader';

export class AudioVisualizerLoaderURL extends AudioVisualizerLoader {
  async loadAudio(audio: string) {
    const response = await fetch(audio);

    return response.arrayBuffer();
  } 
}
