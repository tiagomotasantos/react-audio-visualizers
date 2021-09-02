export type Color = THREE.Color | string | number;

export type Audio = string | File | ArrayBuffer;

export enum AudioVisualizerStatus {
  playing = 'PLAYING',
  paused = 'PAUSED',
};
