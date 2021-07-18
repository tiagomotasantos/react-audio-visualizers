import { Audio } from '../../types';
import { AudioVisualizerLoader } from './AudioVisualizerLoader';
import { AudioVisualizerLoaderArrayBuffer } from './AudioVisualizerLoaderArrayBuffer';
import { AudioVisualizerLoaderFile } from './AudioVisualizerLoaderFile';
import { AudioVisualizerLoaderURL } from './AudioVisualizerLoaderURL';

export class AudioVisualizerLoaderFactory {
  static newAudioVisualizerLoader(audio: Audio): AudioVisualizerLoader {
    const type = typeof audio;

    if (type === 'string') {
      return new AudioVisualizerLoaderURL();
    }

    if (type === 'object') {
      if (audio instanceof File) {
        return new AudioVisualizerLoaderFile();
      }

      if (audio instanceof ArrayBuffer) {
        return new AudioVisualizerLoaderArrayBuffer();
      }
    }

    return new AudioVisualizerLoaderURL();
  }
}