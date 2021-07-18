import { Audio } from '../../types';

export abstract class AudioVisualizerLoader {
  abstract loadAudio(audio: Audio): Promise<ArrayBuffer>;
}
