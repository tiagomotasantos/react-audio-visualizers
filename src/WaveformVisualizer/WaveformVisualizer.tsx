import { AudioVisualizer, AudioVisualizerCommonProps, Color } from 'packages/react-audio-visualizers-core/src';
import { SquaredBarsWaveformVisualizer } from './SquareBarsWaveformVisualizer';

export const DEFAULT_COLOR = 'white';
export const DEFAULT_MARGIN_HEIGHT_TOP = 10;
export const DEFAULT_BAR_WIDTH = 10;
export const DEFAULT_BAR_MARGIN = 2.5;
export const OFF_SCREEN_OFFSET = 20;

export const MIN_DECIBEL = 128;
export const MAX_DECIBEL = 255;

// in world units
export const REFERENCE_SPECTRUM_WIDTH = 1280;
export const MIN_BAR_HEIGHT = 10;

// time in seconds to draw 
export const DEFAULT_REFRESH_RATE = 0.025;

export enum WaveformVisualizerTheme {
  squaredBars = 'SQUARED_BARS',
  line = 'LINE',
}

export interface WaveformVisualizerProps extends AudioVisualizerCommonProps {
  theme: WaveformVisualizerTheme;
  colors?: Color[];
  barWidth?: number;
  barMargin?: number;
  refreshRate?: number;
}

const WaveformVisualizerThemeComponent = ({
  theme,
  barWidth = DEFAULT_BAR_WIDTH,
  barMargin = DEFAULT_BAR_MARGIN,
  refreshRate = DEFAULT_REFRESH_RATE,
  colors = [DEFAULT_COLOR],
}: WaveformVisualizerProps) => {
  switch(theme) {
    case WaveformVisualizerTheme.squaredBars:
      return <SquaredBarsWaveformVisualizer
        colors={colors}
        barWidth={barWidth}
        barMargin={barMargin}
        refreshRate={refreshRate}
      />;
    default:
      return null;
  }
};

export const WaveformVisualizer = (props: WaveformVisualizerProps) => (
  <AudioVisualizer canvasProps={{ orthographic: true }} {...props}>
    <WaveformVisualizerThemeComponent {...props} />
  </AudioVisualizer>
);
