import { AudioVisualizer } from 'packages/react-audio-visualizers-core/src';
import { RoundBarsSpectrumVisualizer } from './RoundBarsSpectrumVisualizer';
import { SpectrumVisualizerProps, SpectrumVisualizerTheme } from './types';

const SpectrumVisualizerThemeComponent = ({ theme }: SpectrumVisualizerProps) => {
  switch(theme) {
    case SpectrumVisualizerTheme.roundBars:
      return <RoundBarsSpectrumVisualizer />;
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
