import { useState, useMemo, ReactNode } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { AudioVisualizerUtils, useAudioVisualizerContext } from 'react-audio-visualizers-core';
import {
  DEFAULT_MARGIN_HEIGHT_TOP,
  DEFAULT_STARTING_ANGLE,
  MAX_DECIBEL,
  MIN_BAR_HEIGHT,
  MIN_DECIBEL,
  REFERENCE_SPECTRUM_WIDTH,
  SpectrumVisualizerProps
} from './SpectrumVisualizer';
import { SquaredBar } from '../shared/components/SquaredBar';

const DEFAULT_BAR_WIDTH = 14;
const DEFAULT_NUM_BARS = 75;

interface RadialSquaredBarsSpectrumVisualizerProps extends Pick<
  SpectrumVisualizerProps,
  'numBars' | 'radius' | 'barWidth' | 'startingAngle' | 'colors' | 'lowFrequency' | 'highFrequency' | 'mirror'
> {}

export const RadialSquaredBarsSpectrumVisualizer = ({
  numBars = DEFAULT_NUM_BARS,
  radius,
  barWidth: customBarWidth,
  startingAngle = DEFAULT_STARTING_ANGLE,
  colors,
  lowFrequency,
  highFrequency,
  mirror,
}: RadialSquaredBarsSpectrumVisualizerProps) => {
  const { audioContext, analyser } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const halfBars = Math.round(numBars / 2);
  const barWidth = customBarWidth || Math.round(viewportWidth * DEFAULT_BAR_WIDTH / REFERENCE_SPECTRUM_WIDTH);
  const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
  const angleInterval = 2 * Math.PI / numBars;
  const r = radius || Math.sqrt(Math.pow(viewportWidth, 2) + Math.pow(viewportHeight, 2)) / 8;
  const interval = AudioVisualizerUtils.getFrequencyInterval(lowFrequency, highFrequency, mirror ? halfBars : numBars, dataArray, audioContext?.sampleRate);
  const [bars, setBars] = useState<ReactNode[]>([]);
  const positions = Array.from(Array(numBars), (_, i) => {
    const angle = i * angleInterval + startingAngle;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);

    return { x, y, angle };
  });
  const ninetyDegrees = useMemo(() => Math.PI / 2, []);
  const smallerAxis = viewportWidth < viewportHeight ? viewportWidth : viewportHeight;
  const maxBarHeight = smallerAxis - (smallerAxis / 2 + r);
  const maxIndex = mirror ? halfBars : Infinity;

  useFrame(() => {
    if (analyser && audioContext) {
      analyser.getByteFrequencyData(dataArray);
      
      const bars = [];
      const filteredData = AudioVisualizerUtils.filterFrequencies(lowFrequency, highFrequency, dataArray, audioContext.sampleRate);

      for (let i = 0; i < numBars; i++) {
        const height = AudioVisualizerUtils.map(filteredData[i % maxIndex * interval], MIN_DECIBEL, MAX_DECIBEL, MIN_BAR_HEIGHT, maxBarHeight - DEFAULT_MARGIN_HEIGHT_TOP) || MIN_BAR_HEIGHT;
        const { x, y, angle } = positions[i];

        bars.push(
          <SquaredBar
            key={i}
            height={height}
            width={barWidth}
            position={[x, y]}
            rotation={angle - ninetyDegrees}
            colors={colors}
          />
        );
      }

      setBars(bars);
    }
  });

  return <>{bars}</>;
};
