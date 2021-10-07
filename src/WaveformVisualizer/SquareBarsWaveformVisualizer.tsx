import { useMemo, createRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Clock, Mesh } from 'three';
import { AudioVisualizerStatus, AudioVisualizerUtils, useAudioVisualizerContext } from 'react-audio-visualizers-core';
import { DEFAULT_MARGIN_HEIGHT_TOP, MAX_DECIBEL, MIN_BAR_HEIGHT, MIN_DECIBEL, WaveformVisualizerProps } from './WaveformVisualizer';
import { SquaredBar } from 'shared/components/SquaredBar';

interface SquaredBarsWaveformVisualizerProps extends Pick<WaveformVisualizerProps, 'colors'> {
  barWidth: number;
  barMargin: number;
  refreshRate: number;
}

const clock = new Clock();

export const SquaredBarsWaveformVisualizer = ({
  colors,
  barWidth,
  barMargin,
  refreshRate
}: SquaredBarsWaveformVisualizerProps) => {
  const { audioContext, analyser, status } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const halfVisualizerWidth = viewportWidth / 2;
  const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
  const nBars = Math.round(viewportWidth / (barWidth + barMargin)) + 1;
  const refs = useMemo(() => Array.from(Array(nBars)).map(_ => createRef<Mesh>()), [nBars]);
  const bars = useMemo(() => Array.from(Array(nBars), (_, i) => (
    <SquaredBar
      key={i}
      height={MIN_BAR_HEIGHT}
      colors={colors}
      width={barWidth}
      position={[halfVisualizerWidth - (barWidth + barMargin) * i, viewportHeight]}
      meshRef={refs[i]}
    />
  )), [nBars, refs, halfVisualizerWidth, viewportHeight, colors, barWidth, barMargin]);

  useFrame(() => {
    if (analyser && audioContext && status === AudioVisualizerStatus.playing && clock.getElapsedTime() > refreshRate) {
      analyser.getByteTimeDomainData(dataArray);
      const height = Math.max(AudioVisualizerUtils.map(Math.max(...Array.from(dataArray)), MIN_DECIBEL, MAX_DECIBEL, 0, viewportHeight - DEFAULT_MARGIN_HEIGHT_TOP), 0) || MIN_BAR_HEIGHT;

      for(let i = nBars - 1; i >= 0; i--) {
        const geometryPosition = refs[i].current?.geometry.attributes.position!;
        const meshPosition = refs[i].current?.position!;

        if (i === 0) {
          const halfHeight = height * 0.5;

          geometryPosition.setY(0, halfHeight);
          geometryPosition.setY(1, halfHeight);
          geometryPosition.setY(2, -halfHeight);
          geometryPosition.setY(3, -halfHeight);
          meshPosition.setY(MIN_BAR_HEIGHT * -0.5);
        } else {
          const previousGeometryPosition = refs[i - 1].current?.geometry.attributes.position!;
          const topY = previousGeometryPosition?.getY(0);
          const bottomY = previousGeometryPosition?.getY(2);
          const previousMeshPosition = refs[i - 1].current?.position!;

          geometryPosition.setY(0, topY);
          geometryPosition.setY(1, topY);
          geometryPosition.setY(2, bottomY);
          geometryPosition.setY(3, bottomY);
          meshPosition.setY(previousMeshPosition.y);
        }

        geometryPosition.needsUpdate = true;
      }

      clock.start();
    }
  });

  return <>{bars}</>
};
