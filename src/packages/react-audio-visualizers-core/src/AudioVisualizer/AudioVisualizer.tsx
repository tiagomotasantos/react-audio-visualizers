import { ReactElement } from 'react';
import { Props as CanvasProps } from '@react-three/fiber';
import { AudioVisualizerProvider } from './AudioVisualizerProvider';
import { AudioVisualizerUI } from './AudioVisualizerUI';
import { AudioVisualizerScene } from './AudioVisualizerScene';

export interface AudioVisualizerProps {
  children: ReactElement;
}

export interface AudioVisualizerCommonProps {
  audio: string;
  canvasProps?: Omit<CanvasProps, 'children'>;
  smoothingTimeConstant?: number;
  fftSize?: number;
}

export const AudioVisualizer = ({
  children,
  audio,
  canvasProps,
  smoothingTimeConstant,
  fftSize,
}: AudioVisualizerProps & AudioVisualizerCommonProps) => (
  <AudioVisualizerProvider>
    <AudioVisualizerUI
      audio={audio}
      smoothingTimeConstant={smoothingTimeConstant}
      fftSize={fftSize}
    />
    <AudioVisualizerScene canvasProps={canvasProps}>
      {children}
    </AudioVisualizerScene>
  </AudioVisualizerProvider>
);
