import { useEffect, useRef, useMemo, useState, ReactNode } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { BufferGeometry, Clock, Vector2 } from 'three';
import { AudioVisualizerUtils, Color, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';
import { WaveformVisualizerProps } from './WaveformVisualizer';
import { SquaredBar, SquaredBarProps } from 'SpectrumVisualizer/SquaredBar';

interface SquaredBarsWaveformVisualizerProps extends Omit<WaveformVisualizerProps, 'theme'>{}

let barProps: SquaredBarProps[] = []

const BAR_WIDTH = 5;

export const SquaredBarsWaveformVisualizer = ({
  colors,
}: SquaredBarsWaveformVisualizerProps) => {
  const { audioContext, analyser } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const visualizerWidth = viewportWidth - 5; // margin
  const halfVisualizerWidth = visualizerWidth / 2;
  const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
  let barsX: number[] = [];
  const barWidth = 50;
  const barMargin = 2;
  const [bars, setBars] = useState<ReactNode[]>([]);

  useFrame(() => {
    if (analyser && audioContext) {
      analyser.getByteTimeDomainData(dataArray);
      const mean = AudioVisualizerUtils.mean(dataArray);
      const height = Math.max(AudioVisualizerUtils.map(dataArray[0], 128, 255, 0, viewportHeight), 0);
      
      barProps = barProps.map(({ position: [x, y], ...rest }) => ({
        position: [x - BAR_WIDTH, y],
        ...rest
      }));
      barProps = barProps.filter(bp => Math.abs(bp.position[0]) < halfVisualizerWidth + 100)
      barProps.push({
        height,
        colors,
        width: BAR_WIDTH,
        position: [halfVisualizerWidth - BAR_WIDTH, -height * 0.5],
      });

      setBars(barProps.map((bp, i) => (<SquaredBar key={i} {...bp} />)));
    }
  });

  return <>{bars}</>;
};
