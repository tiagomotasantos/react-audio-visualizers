import { useMemo, useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { BufferGeometry, Vector2 } from 'three';
import { AudioVisualizerUtils, useAudioVisualizerContext, Color } from 'packages/react-audio-visualizers-core/src';
import {
  DEFAULT_MARGIN_HEIGHT_TOP,
  DEFAULT_STARTING_ANGLE,
  MAX_DECIBEL,
  MIN_BAR_HEIGHT,
  MIN_DECIBEL,
  SpectrumVisualizerProps
} from './SpectrumVisualizer';

const DEFAULT_NUM_BARS = 75;

interface RadialLineSpectrumVisualizerProps extends Pick<
  SpectrumVisualizerProps,
  'numBars' | 'radius' | 'startingAngle' | 'lowFrequency' | 'highFrequency' | 'mirror'
> {
  color?: Color;
}

export const RadialLineSpectrumVisualizer = ({
  numBars = DEFAULT_NUM_BARS,
  radius,
  startingAngle = DEFAULT_STARTING_ANGLE,
  color,
  lowFrequency,
  highFrequency,
  mirror,
}: RadialLineSpectrumVisualizerProps) => {
  const { audioContext, analyser } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const halfBars = Math.round(numBars / 2);
  const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
  const angleInterval = 2 * Math.PI / numBars;
  const r = radius || Math.sqrt(Math.pow(viewportWidth, 2) + Math.pow(viewportHeight, 2)) / 8;
  const interval = AudioVisualizerUtils.getFrequencyInterval(lowFrequency, highFrequency, mirror ? halfBars : numBars, dataArray, audioContext?.sampleRate);
  const smallerAxis = viewportWidth < viewportHeight ? viewportWidth : viewportHeight;
  const maxBarHeight = smallerAxis - (smallerAxis / 2 + r);
  const maxIndex = mirror ? halfBars : Infinity;
  const ref = useRef<BufferGeometry>();
  const line = useMemo(() => (
    <lineLoop>
      <bufferGeometry ref={ref} />
      <lineBasicMaterial color={color} />
    </lineLoop>
  ), [ref, color]);
  const positions = useMemo(() => (
    Array.from(Array(numBars), (_, i) => {
      const angle = i * angleInterval + startingAngle;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
  
      return { x, y, angle };
    })
  ), [numBars, startingAngle, angleInterval, r]);

  useEffect(() => {
    ref.current?.setFromPoints(
      Array.from(Array(numBars), (_, i) => new Vector2(positions[i].x, positions[i].y))
    );
  }, [numBars, positions]);

  useFrame(() => {
    if (analyser && audioContext && ref.current) {
      analyser.getByteFrequencyData(dataArray);
      
      const filteredData = AudioVisualizerUtils.filterFrequencies(lowFrequency, highFrequency, dataArray, audioContext.sampleRate);

      for (let i = 0; i < numBars; i++) {
        const height = AudioVisualizerUtils.map(filteredData[i % maxIndex * interval], MIN_DECIBEL, MAX_DECIBEL, MIN_BAR_HEIGHT, maxBarHeight - DEFAULT_MARGIN_HEIGHT_TOP) || MIN_BAR_HEIGHT;
        const { angle, x, y } = positions[i];

        ref.current.attributes.position.setX(i, height * Math.cos(angle) + x);
        ref.current.attributes.position.setY(i, height * Math.sin(angle) + y);
        ref.current.attributes.position.needsUpdate = true;
      }
    }
  });

  return line;
};
