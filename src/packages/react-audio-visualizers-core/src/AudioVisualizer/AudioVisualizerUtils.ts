export class AudioVisualizerUtils {
  static map(n: number, start1: number, stop1: number, start2: number, stop2: number) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  } 
  
  static filterFrequencies(lowFrequency: number, highFrequency: number, dataArray: Uint8Array, sampleRate: number) {
    const frequencyStep = sampleRate / 2 / dataArray.length;
    const lowIndex = Math.round(lowFrequency / frequencyStep);
    const highIndex = Math.round(highFrequency / frequencyStep);
  
    return dataArray.slice(lowIndex, highIndex);
  };
}
