import { AudioVisualizer, AudioVisualizerCommonProps, Color } from 'packages/react-audio-visualizers-core/src';
import { LineSpectrumVisualizer } from './LineSpectrumVisualizer';
import { RadialLineSpectrumVisualizer } from './RadialLineSpectrumVisualizer';
import { RadialSquaredBarsSpectrumVisualizer } from './RadialSquaredBarsSpectrumVisualizer';
import { RoundBarsSpectrumVisualizer } from './RoundBarsSpectrumVisualizer';
import { SquaredBarsSpectrumVisualizer } from './SquaredBarsSpectrumVisualizer';

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

export enum SpectrumVisualizerTheme {
  roundBars = 'ROUND_BARS',
  squaredBars = 'SQUARED_BARS',
  line = 'LINE',
  radialSquaredBars = 'RADIAL_SQUARED_BARS',
  radialLine = 'RADIAL_LINE',
}

export interface SpectrumVisualizerProps extends AudioVisualizerCommonProps {
  theme: SpectrumVisualizerTheme;
  colors?: Color[];
  lowFrequency?: number;
  highFrequency?: number;
  numBars?: number
  radius?: number;
  barWidth?: number;
  startingAngle?: number;
  mirror?: boolean;
}

const SpectrumVisualizerThemeComponent = ({
  theme,
  lowFrequency,
  highFrequency,
  numBars,
  radius,
  barWidth,
  startingAngle,
  mirror,
  colors = [DEFAULT_COLOR],
}: SpectrumVisualizerProps) => {
  switch(theme) {
    case SpectrumVisualizerTheme.roundBars:
      return <RoundBarsSpectrumVisualizer
        numBars={numBars}
        lowFrequency={lowFrequency}
        highFrequency={highFrequency}
        color={colors[0]}
      />;
    case SpectrumVisualizerTheme.squaredBars:
      return <SquaredBarsSpectrumVisualizer
        numBars={numBars}
        lowFrequency={lowFrequency}
        highFrequency={highFrequency}
        colors={colors}
      />;
    case SpectrumVisualizerTheme.line:
      return <LineSpectrumVisualizer
        numBars={numBars}
        lowFrequency={lowFrequency}
        highFrequency={highFrequency}
        color={colors[0]}
      />;
    case SpectrumVisualizerTheme.radialSquaredBars:
      return <RadialSquaredBarsSpectrumVisualizer
        numBars={numBars}
        lowFrequency={lowFrequency}
        highFrequency={highFrequency}
        colors={colors}
        radius={radius}
        barWidth={barWidth}
        startingAngle={startingAngle}
        mirror={mirror}
      />;
    case SpectrumVisualizerTheme.radialLine:
      return <RadialLineSpectrumVisualizer
        numBars={numBars}
        lowFrequency={lowFrequency}
        highFrequency={highFrequency}
        color={colors[0]}
        radius={radius}
        startingAngle={startingAngle}
        mirror={mirror}
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
