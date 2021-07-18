import { ReactElement } from 'react';
import { Props as CanvasProps } from '@react-three/fiber';
import { AudioVisualizerProvider } from './AudioVisualizerProvider';
import { AudioVisualizerUI } from './AudioVisualizerUI';
import { AudioVisualizerScene } from './AudioVisualizerScene';
import './styles.css';
import { Audio } from '../types';

export interface AudioVisualizerProps {
  children: ReactElement;
}

export interface AudioVisualizerCommonProps {
  audio?: Audio;
  canvasProps?: Omit<CanvasProps, 'children'>;
  smoothingTimeConstant?: number;
  fftSize?: number;
  iconsColor?: string;
  showMainActionIcon?: boolean;
}

export const AudioVisualizer = ({
  children,
  audio,
  canvasProps,
  smoothingTimeConstant,
  fftSize,
  iconsColor,
  showMainActionIcon,
}: AudioVisualizerProps & AudioVisualizerCommonProps) => (
  <AudioVisualizerProvider>
    <div className="audio-visualizer">
      <AudioVisualizerUI
        audio={audio}
        smoothingTimeConstant={smoothingTimeConstant}
        fftSize={fftSize}
        iconsColor={iconsColor}
        showMainActionIcon={showMainActionIcon}
      />
      <AudioVisualizerScene canvasProps={canvasProps}>
        {children}
      </AudioVisualizerScene>
    </div>
  </AudioVisualizerProvider>
);
