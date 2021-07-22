import { AudioVisualizer, AudioVisualizerCommonProps, Color } from 'packages/react-audio-visualizers-core/src';
import { RoundBarsSpectrumVisualizer } from './RoundBarsSpectrumVisualizer';
import { SquaredBarsSpectrumVisualizer } from './SquaredBarsSpectrumVisualizer';

export const MIN_DECIBEL = 0;
export const MAX_DECIBEL = 255;

// frequency interval to show in Hz
export const LOW_FREQUENCY_LIMIT = 20;
export const HIGH_FREQUENCY_LIMIT = 20000;

export enum SpectrumVisualizerTheme {
  roundBars = 'ROUND_BARS',
  squaredBars = 'SQUARED_BARS',
  line = 'LINE',
  radialRoundBars = 'RADIAL_ROUND_BARS',
  radialSquaredBars = 'RADIAL_SQUARED_BARS',
  radialLine = 'RADIAL_LINE',
}

export interface SpectrumVisualizerProps extends AudioVisualizerCommonProps {
  theme: SpectrumVisualizerTheme;
  color?: Color;
  lowFrequency?: number;
  highFrequency?: number;
}

const SpectrumVisualizerThemeComponent = ({
  theme,
  lowFrequency,
  highFrequency,
  color,
}: SpectrumVisualizerProps) => {
  switch(theme) {
    case SpectrumVisualizerTheme.roundBars:
      return <RoundBarsSpectrumVisualizer
        lowFrequency={lowFrequency}
        highFrequency={highFrequency}
        color={color}
      />;
    case SpectrumVisualizerTheme.squaredBars:
      return <SquaredBarsSpectrumVisualizer
        lowFrequency={lowFrequency}
        highFrequency={highFrequency}
        color={color}
      />;
    default:
      return null;
  }
};

export const SpectrumVisualizer = (props: SpectrumVisualizerProps) => {
  const {
    theme,
    lowFrequency,
    highFrequency,
    ...audioVisualizerCommonProps
  } = props;

  return (
    <AudioVisualizer canvasProps={{ orthographic: true }} {...audioVisualizerCommonProps}>
      <SpectrumVisualizerThemeComponent {...props} />
    </AudioVisualizer>
  );
}
