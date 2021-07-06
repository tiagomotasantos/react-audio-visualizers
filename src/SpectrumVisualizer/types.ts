import { AudioVisualizerCommonProps } from 'packages/react-audio-visualizers-core/src';

export enum SpectrumVisualizerTheme {
  roundBars = 'ROUND_BARS',
  squaredBars = 'SQUARED_BARS',
  line = 'LINE',
  radialRoundBars = 'RADIAL_ROUND_BARS',
  radialSquaredBars = 'RADIAL_SQUARED_BARS',
  radialLine = 'RADIAL_LINE',
}

export type ColorGradient = { colorA: string, colorB: string };

export type Color = THREE.Color | ColorGradient | string | number;

export interface SpectrumVisualizerProps extends AudioVisualizerCommonProps {
  theme: SpectrumVisualizerTheme;
  color?: Color;
  lowFrequency?: number;
  highFrequency?: number;
}
