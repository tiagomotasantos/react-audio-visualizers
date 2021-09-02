import { HIGH_FREQUENCY_LIMIT, LOW_FREQUENCY_LIMIT } from '../constants';

export class AudioVisualizerUtils {
  static map(n: number, start1: number, stop1: number, start2: number, stop2: number) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  }
  
  static filterFrequencies(
    lowFrequency: number = LOW_FREQUENCY_LIMIT,
    highFrequency: number = HIGH_FREQUENCY_LIMIT,
    dataArray: Uint8Array,
    sampleRate: number,
  ) {
    const frequencyStep = sampleRate / 2 / dataArray.length;
    const lowIndex = Math.round(lowFrequency / frequencyStep);
    const highIndex = Math.round(highFrequency / frequencyStep);
  
    return dataArray.slice(lowIndex, highIndex);
  };

  static getFrequencyInterval(
    lowFrequency: number = LOW_FREQUENCY_LIMIT,
    highFrequency: number = HIGH_FREQUENCY_LIMIT,
    nBars: number,
    dataArray?: Uint8Array,
    sampleRate?: number,
  ) {
    if (!dataArray || dataArray.length === 0 || !sampleRate) {
      return 0;
    }

    const frequencyStep = sampleRate / 2 / dataArray.length;
    const lowIndex = Math.round(lowFrequency / frequencyStep);
    const highIndex = Math.round(highFrequency / frequencyStep);
    const filteredLength = highIndex - lowIndex;


    return Math.floor(filteredLength / nBars);
  };
}
