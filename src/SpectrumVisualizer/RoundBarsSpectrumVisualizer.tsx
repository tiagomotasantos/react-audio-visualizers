import { ReactNode, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { AudioVisualizerUtils, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';
import { SpectrumVisualizerProps } from './SpectrumVisualizer';
import { Bar } from './Bar';

const DEFAULT_MARGIN = 15;
const DEFAULT_MARGIN_HEIGHT = 5;
const DEFAULT_NUM_BARS = 63;

// in world units
const REFERENCE_SPECTRUM_WIDTH = 1265;
const MIN_BAR_HEIGHT = 10;

const MIN_DECIBEL = 0;
const MAX_DECIBEL = 255;

// frequency interval to show in Hz
const LOW_FREQUENCY_LIMIT = 20;
const HIGH_FREQUENCY_LIMIT = 20000;

interface RoundBarsSpectrumVisualizerProps extends Pick<SpectrumVisualizerProps, 'color' | 'lowFrequency' | 'highFrequency'> {
  numBars?: number;
  margin?: number;
}

export const RoundBarsSpectrumVisualizer = ({
  numBars,
  margin = DEFAULT_MARGIN,
  color,
  lowFrequency,
  highFrequency,
}: RoundBarsSpectrumVisualizerProps) => {
  const { audioContext, analyser } = useAudioVisualizerContext();
  const { viewport: {width: viewportWidth, height: viewportHeight} } = useThree();
  const spectrumWidth = viewportWidth - margin;
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
        const height = AudioVisualizerUtils.map(filteredData[i * interval], MIN_DECIBEL, MAX_DECIBEL, MIN_BAR_HEIGHT, viewportHeight - DEFAULT_MARGIN_HEIGHT) || MIN_BAR_HEIGHT;
        const x = spacing * i - halfSpectrumWidth;
        const y = -halfSpectrumHeight + DEFAULT_MARGIN_HEIGHT;

        bars.push(
          <Bar
            key={i}
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
