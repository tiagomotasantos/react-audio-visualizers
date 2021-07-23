import { ReactNode, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { AudioVisualizerUtils, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';
import {
  DEFAULT_MARGIN_HEIGHT_BOTTOM,
  DEFAULT_MARGIN_HEIGHT_TOP,
  DEFAULT_MARGIN_WIDTH,
  DEFAULT_NUM_BARS,
  HIGH_FREQUENCY_LIMIT, 
  LOW_FREQUENCY_LIMIT,
  MAX_DECIBEL,
  MIN_BAR_HEIGHT,
  MIN_DECIBEL,
  REFERENCE_SPECTRUM_WIDTH,
  SpectrumVisualizerProps
} from './SpectrumVisualizer';
import { SquaredBar } from './SquaredBar';

const DEFAULT_BAR_WIDTH = 18;

interface SquaredBarsSpectrumVisualizerProps extends Pick<SpectrumVisualizerProps, 'color' | 'lowFrequency' | 'highFrequency'> {
  numBars?: number;
}

export const SquaredBarsSpectrumVisualizer = ({
  numBars,
  color,
  lowFrequency,
  highFrequency,
}: SquaredBarsSpectrumVisualizerProps) => {
  const { audioContext, analyser } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const spectrumWidth = viewportWidth - DEFAULT_MARGIN_WIDTH;
  const halfSpectrumWidth = spectrumWidth / 2;
  const halfSpectrumHeight = viewportHeight / 2;
  const nBars = numBars || viewportWidth * DEFAULT_NUM_BARS / REFERENCE_SPECTRUM_WIDTH;
  const spacing = spectrumWidth / nBars;
  const [bars, setBars] = useState<ReactNode[]>([]);

  useFrame(() => {
    if (analyser && audioContext) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const bars = [];

      analyser.getByteFrequencyData(dataArray);
      
      const filteredData = AudioVisualizerUtils.filterFrequencies(lowFrequency || LOW_FREQUENCY_LIMIT, highFrequency || HIGH_FREQUENCY_LIMIT, dataArray, audioContext.sampleRate);
      const interval = Math.floor(filteredData.length / nBars);

      for (let i = 0; i < nBars; i++) {
        const height = AudioVisualizerUtils.map(filteredData[i * interval], MIN_DECIBEL, MAX_DECIBEL, MIN_BAR_HEIGHT, viewportHeight - DEFAULT_MARGIN_HEIGHT_TOP) || MIN_BAR_HEIGHT;
        const x = spacing * i - halfSpectrumWidth;
        const y = -halfSpectrumHeight + DEFAULT_MARGIN_HEIGHT_BOTTOM;

        bars.push(
          <SquaredBar
            key={i}
            width={DEFAULT_BAR_WIDTH}
            height={height}
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
