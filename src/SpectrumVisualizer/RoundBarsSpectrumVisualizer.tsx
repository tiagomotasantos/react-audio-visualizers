import { ReactNode, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { AudioVisualizerUtils, Color, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';
import {
  DEFAULT_MARGIN_HEIGHT_BOTTOM,
  DEFAULT_MARGIN_HEIGHT_TOP,
  DEFAULT_MARGIN_WIDTH,
  DEFAULT_NUM_BARS,
  MAX_DECIBEL,
  MIN_BAR_HEIGHT,
  MIN_DECIBEL,
  REFERENCE_SPECTRUM_WIDTH,
  SpectrumVisualizerProps
} from './SpectrumVisualizer';
import { RoundBar } from './RoundBar';

const DEFAULT_BAR_WIDTH = 12;

interface RoundBarsSpectrumVisualizerProps extends Pick<SpectrumVisualizerProps, 'lowFrequency' | 'highFrequency'> {
  numBars?: number;
  margin?: number;
  color?: Color;
}

export const RoundBarsSpectrumVisualizer = ({
  numBars,
  margin = DEFAULT_MARGIN_WIDTH,
  color,
  lowFrequency,
  highFrequency,
}: RoundBarsSpectrumVisualizerProps) => {
  const { audioContext, analyser } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const spectrumWidth = viewportWidth - margin;
  const halfSpectrumWidth = spectrumWidth / 2;
  const halfSpectrumHeight = viewportHeight / 2;
  const nBars = numBars || viewportWidth * DEFAULT_NUM_BARS / REFERENCE_SPECTRUM_WIDTH;
  const spacing = spectrumWidth / nBars;
  const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
  const interval = AudioVisualizerUtils.getFrequencyInterval(lowFrequency, highFrequency, nBars, dataArray,  audioContext?.sampleRate);
  const [bars, setBars] = useState<ReactNode[]>([]);

  useFrame(() => {
    if (analyser && audioContext) {
      analyser.getByteFrequencyData(dataArray);
      
      const bars = [];
      const filteredData = AudioVisualizerUtils.filterFrequencies(lowFrequency, highFrequency, dataArray, audioContext.sampleRate);

      for (let i = 0; i < nBars; i++) {
        const height = AudioVisualizerUtils.map(filteredData[i * interval], MIN_DECIBEL, MAX_DECIBEL, MIN_BAR_HEIGHT, viewportHeight - DEFAULT_MARGIN_HEIGHT_TOP) || MIN_BAR_HEIGHT;
        const x = spacing * i - halfSpectrumWidth;
        const y = -halfSpectrumHeight + DEFAULT_MARGIN_HEIGHT_BOTTOM;

        bars.push(
          <RoundBar
            key={i}
            height={height}
            width={DEFAULT_BAR_WIDTH}
            position={[x, y]}
            color={color}
          />
        );
      }

      setBars(bars);
    }
  });

  return <>{bars}</>;
};
