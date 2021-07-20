export enum AudioVisualizerEvents {
  playing = 'PLAYING',
  paused = 'PAUSED',
  loading = 'LOADING',
  loaded = 'LOADED',
  error = 'ERROR',
};

export type AudioVisualizerEventListener = (event: AudioVisualizerEvents, payload?: any) => void;
