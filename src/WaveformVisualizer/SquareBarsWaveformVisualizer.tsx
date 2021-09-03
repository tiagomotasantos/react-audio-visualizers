import { useState, ReactNode } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Clock } from 'three';
import { AudioVisualizerStatus, AudioVisualizerUtils, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';
import { DEFAULT_MARGIN_HEIGHT_TOP, MAX_DECIBEL, MIN_DECIBEL, OFF_SCREEN_OFFSET, WaveformVisualizerProps } from './WaveformVisualizer';
import { SquaredBar, SquaredBarProps } from 'shared/components/SquaredBar';

interface SquaredBarsWaveformVisualizerProps extends Pick<WaveformVisualizerProps, 'colors'> {
  barWidth: number;
  barMargin: number;
  refreshRate: number;
}

const clock = new Clock();
let barProps: SquaredBarProps[] = [];

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
  const [bars, setBars] = useState<ReactNode[]>([]);

  useFrame(() => {
    if (analyser && audioContext && status === AudioVisualizerStatus.playing && clock.getElapsedTime() > refreshRate) {
      analyser.getByteTimeDomainData(dataArray);
      const height = Math.max(AudioVisualizerUtils.map(Math.max(...Array.from(dataArray)), MIN_DECIBEL, MAX_DECIBEL, 0, viewportHeight - DEFAULT_MARGIN_HEIGHT_TOP), 0);

      // move bars to the left
      barProps = barProps.map(({ position: [x, y], ...rest }) => ({
        position: [x - barWidth - barMargin, y],
        ...rest
      }));
      
      // remove bars that are off screen 
      barProps = barProps.filter(bp => Math.abs(bp.position[0]) < halfVisualizerWidth + OFF_SCREEN_OFFSET)
      
      // add new bar
      barProps.push({
        height,
        colors,
        width: barWidth,
        position: [halfVisualizerWidth - barWidth, height * -0.5],
      });

      setBars(barProps.map((bp, i) => (<SquaredBar key={i} {...bp} />)));
      clock.start();
    }
  });

  return <>{bars}</>;
};
