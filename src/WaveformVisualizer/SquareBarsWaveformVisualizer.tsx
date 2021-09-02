import { useState, ReactNode } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Clock } from 'three';
import { AudioVisualizerStatus, AudioVisualizerUtils, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';
import { WaveformVisualizerProps } from './WaveformVisualizer';
import { SquaredBar, SquaredBarProps } from 'SpectrumVisualizer/SquaredBar';

interface SquaredBarsWaveformVisualizerProps extends Omit<WaveformVisualizerProps, 'theme'>{}

const BAR_WIDTH = 10;
const BAR_MARGIN = 2.5;
const OFF_SCREEN_OFFSET = 20;
const DEFAULT_MARGIN_HEIGHT_TOP = 10;
// time in seconds to draw 
const REFRESH_RATE = 0.025;
const clock = new Clock();
let barProps: SquaredBarProps[] = [];

export const SquaredBarsWaveformVisualizer = ({
  colors,
}: SquaredBarsWaveformVisualizerProps) => {
  const { audioContext, analyser, status } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const visualizerWidth = viewportWidth - 5; // margin
  const halfVisualizerWidth = visualizerWidth / 2;
  const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
  const [bars, setBars] = useState<ReactNode[]>([]);

  useFrame(() => {
    if (analyser && audioContext && status === AudioVisualizerStatus.playing && clock.getElapsedTime() > REFRESH_RATE) {
      analyser.getByteTimeDomainData(dataArray);
      const height = Math.max(AudioVisualizerUtils.map(Math.max(...Array.from(dataArray)), 128, 255, 0, viewportHeight - DEFAULT_MARGIN_HEIGHT_TOP), 0);

      // move bars to the left
      barProps = barProps.map(({ position: [x, y], ...rest }) => ({
        position: [x - BAR_WIDTH - BAR_MARGIN, y],
        ...rest
      }));
      
      // remove bars that are off screen 
      barProps = barProps.filter(bp => Math.abs(bp.position[0]) < halfVisualizerWidth + OFF_SCREEN_OFFSET)
      
      // add new bar
      barProps.push({
        height,
        colors,
        width: BAR_WIDTH,
        position: [halfVisualizerWidth - BAR_WIDTH, height * -0.5],
      });

      setBars(barProps.map((bp, i) => (<SquaredBar key={i} {...bp} />)));
      clock.start();
    }
  });

  return <>{bars}</>;
};
