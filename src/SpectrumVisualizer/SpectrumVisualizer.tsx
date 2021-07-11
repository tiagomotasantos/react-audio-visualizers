import { AudioVisualizer, AudioVisualizerCommonProps, Color } from 'packages/react-audio-visualizers-core/src';
import { RoundBarsSpectrumVisualizer } from './RoundBarsSpectrumVisualizer';

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
