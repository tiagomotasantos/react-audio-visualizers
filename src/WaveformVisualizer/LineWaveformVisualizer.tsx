import { useRef, useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Clock, BufferGeometry, Vector2 } from 'three';
import { AudioVisualizerStatus, AudioVisualizerUtils, Color, useAudioVisualizerContext } from 'react-audio-visualizers-core';
import { DEFAULT_MARGIN_HEIGHT_BOTTOM, DEFAULT_MARGIN_HEIGHT_TOP, MAX_DECIBEL, MIN_DECIBEL } from './WaveformVisualizer';

interface LineWaveformVisualizerProps {
  color?: Color;
  pointSpacing: number;
  refreshRate: number;
}

const clock = new Clock();

export const LineWaveformVisualizer = ({
  color,
  pointSpacing,
  refreshRate,
}: LineWaveformVisualizerProps) => {
  const { audioContext, analyser, status } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const halfVisualizerWidth = viewportWidth / 2;
  const halfVisualizerHeight = viewportHeight / 2;
  const nPoints = Math.round(viewportWidth / pointSpacing) + 1;
  const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
  const ref = useRef<BufferGeometry>();
  const line = useMemo(() => (
    <line>
      <bufferGeometry ref={ref} />
      <lineBasicMaterial color={color} />
    </line>
  ), [ref, color]);

  useEffect(() => {
    ref.current?.setFromPoints(Array.from(Array(nPoints), (_, i) => {
      const x = halfVisualizerWidth - pointSpacing * i;
      const y = -halfVisualizerHeight + DEFAULT_MARGIN_HEIGHT_BOTTOM;

      return new Vector2(x, y);
    }));
  }, [nPoints, pointSpacing, halfVisualizerWidth, halfVisualizerHeight]);

  useFrame(() => {
    if (
        analyser 
        && audioContext
        && status === AudioVisualizerStatus.playing
        && clock.getElapsedTime() > refreshRate
        && ref.current
    ) {
      analyser.getByteTimeDomainData(dataArray);
      const height = AudioVisualizerUtils.map(Math.max(...Array.from(dataArray)), MIN_DECIBEL, MAX_DECIBEL, -halfVisualizerHeight + DEFAULT_MARGIN_HEIGHT_BOTTOM, halfVisualizerHeight - DEFAULT_MARGIN_HEIGHT_TOP);

      for(let i = nPoints - 1; i >= 0; i--) {
        if (i === 0) {
          ref.current.attributes.position.setY(i, height);
        } else {
          ref.current.attributes.position.setY(i, ref.current.attributes.position.getY(i - 1));
        }

        ref.current.attributes.position.needsUpdate = true;
      }

      clock.start();
    }
  });

  return line;
};
