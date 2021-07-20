import { ReactElement } from 'react';
import { Props as CanvasProps } from '@react-three/fiber';
import { Audio } from '../types';
import { AudioVisualizerProvider } from './AudioVisualizerProvider';
import { AudioVisualizerUI } from './AudioVisualizerUI';
import { AudioVisualizerScene } from './AudioVisualizerScene';
import './styles.css';

export interface AudioVisualizerProps {
  children: ReactElement;
}

export interface AudioVisualizerCommonProps {
  audio?: Audio;
  canvasProps?: Omit<CanvasProps, 'children'>;
  smoothingTimeConstant?: number;
  fftSize?: number;
  volume?: number;
  iconsColor?: string;
  showMainActionIcon?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
}

export const AudioVisualizer = ({
  children,
  audio,
  canvasProps,
  smoothingTimeConstant,
  fftSize,
  volume,
  iconsColor,
  showMainActionIcon,
  backgroundColor,
  backgroundImage,
}: AudioVisualizerProps & AudioVisualizerCommonProps) => (
  <AudioVisualizerProvider>
    <div className="audio-visualizer">
      <AudioVisualizerUI
        audio={audio}
        smoothingTimeConstant={smoothingTimeConstant}
        fftSize={fftSize}
        volume={volume}
        iconsColor={iconsColor}
        showMainActionIcon={showMainActionIcon}
      />
      <AudioVisualizerScene
        canvasProps={canvasProps}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
      >
        {children}
      </AudioVisualizerScene>
    </div>
  </AudioVisualizerProvider>
);
