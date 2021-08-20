import { AudioVisualizer, AudioVisualizerCommonProps, Color } from 'packages/react-audio-visualizers-core/src';
import { SquaredBarsWaveformVisualizer } from './SquareBarsWaveformVisualizer';

export const DEFAULT_COLOR = 'white';
export const DEFAULT_MARGIN_WIDTH = 15;
export const DEFAULT_MARGIN_HEIGHT_TOP = 10;
export const DEFAULT_MARGIN_HEIGHT_BOTTOM = 5;
export const DEFAULT_NUM_BARS = 64;
export const DEFAULT_STARTING_ANGLE = Math.PI;

export const MIN_DECIBEL = 0;
export const MAX_DECIBEL = 255;

// in world units
export const REFERENCE_SPECTRUM_WIDTH = 1280;
export const MIN_BAR_HEIGHT = 10;

export enum WaveformVisualizerTheme {
  squaredBars = 'SQUARED_BARS',
  line = 'LINE',
}

export interface WaveformVisualizerProps extends AudioVisualizerCommonProps {
  theme: WaveformVisualizerTheme;
  colors?: Color[];
}

const WaveformVisualizerThemeComponent = ({
  theme,
  colors = [DEFAULT_COLOR],
}: WaveformVisualizerProps) => {
  switch(theme) {
    case WaveformVisualizerTheme.squaredBars:
      return <SquaredBarsWaveformVisualizer colors={colors} />;
    default:
      return null;
  }
};

export const WaveformVisualizer = (props: WaveformVisualizerProps) => (
  <AudioVisualizer canvasProps={{ orthographic: true }} {...props}>
    <WaveformVisualizerThemeComponent {...props} />
  </AudioVisualizer>
);
