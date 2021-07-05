import { ReactNode, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { AudioVisualizerUtils, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';
import { Bar } from './Bar';

const DEFAULT_MARGIN = 0.5;
const DEFAULT_NUM_BARS = 63;

// in world units
const REFERENCE_SPECTRUM_WIDTH = 12.65;
const MIN_DECIBEL = 0;
const MAX_DECIBEL = 255;
const MIN_BAR_HEIGHT = 0.1;
const MAX_BAR_HEIGHT = 2;

// frequency interval to show in Hz
const LOW_FREQUENCY_LIMIT = 20;
const HIGH_FREQUENCY_LIMIT = 20000;

interface RoundBarsSpectrumVisualizerProps {
  numBars?: number;
  margin?: number;
}

export const RoundBarsSpectrumVisualizer = ({
  numBars,
  margin = DEFAULT_MARGIN,
}: RoundBarsSpectrumVisualizerProps) => {
  const { audioContext, analyser } = useAudioVisualizerContext();
  const { viewport: { width } } = useThree();
  const spectrumWidth = width - margin;
  const halfSpectrumWidth = spectrumWidth / 2;
  const nBars = numBars || width * DEFAULT_NUM_BARS / REFERENCE_SPECTRUM_WIDTH;
  const spacing = spectrumWidth / nBars;
  const halfSpacing = spacing / 2;
  const [bars, setBars] = useState<ReactNode[]>([]);

  useFrame(() => {
    if (analyser && audioContext) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const bars = [];

      analyser.getByteFrequencyData(dataArray);
      
      const filteredData = AudioVisualizerUtils.filterFrequencies(LOW_FREQUENCY_LIMIT, HIGH_FREQUENCY_LIMIT, dataArray, audioContext.sampleRate);
      const interval = Math.floor(filteredData.length / nBars);

      for (let i = 0; i < nBars; i++) {
        const height = AudioVisualizerUtils.map(filteredData[i * interval], MIN_DECIBEL, MAX_DECIBEL, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT) || MIN_BAR_HEIGHT;
        bars.push(<Bar key={i} height={height} position={[spacing * i + halfSpacing - halfSpectrumWidth, 0]} />);
      }

      setBars(bars);
    }
  });

  return <>{bars}</>;
};
