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
  mainActionRender?: (action: MainAction) => MainActionRender;
  showMainActionIcon?: boolean;
  showLoaderIcon?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
}

export interface MainAction {
  play: () => void;
  pause: () => void;
}

export interface MainActionRender {
  id: string;
  node: ReactElement;
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
  showLoaderIcon,
  backgroundColor,
  backgroundImage,
  mainActionRender,
}: AudioVisualizerProps & AudioVisualizerCommonProps) => (
  <AudioVisualizerProvider>
    <div className="audio-visualizer">
      <AudioVisualizerUI
        audio={audio}
        smoothingTimeConstant={smoothingTimeConstant}
        fftSize={fftSize}
        volume={volume}
        iconsColor={iconsColor}
        mainActionRender={mainActionRender}
        showMainActionIcon={showMainActionIcon}
        showLoaderIcon={showLoaderIcon}
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
