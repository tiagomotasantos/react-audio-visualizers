import { ReactElement, useContext } from 'react';
import { Canvas, Props as CanvasProps } from '@react-three/fiber';
import { AudioVisualizerContextProvider, AudioVisualizerProvider } from './AudioVisualizerProvider';
import { AudioVisualizerUI } from './AudioVisualizerUI';
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
}: AudioVisualizerProps & AudioVisualizerCommonProps) => {
  const context = useContext(AudioVisualizerContextProvider);

  return (
    <AudioVisualizerProvider>
      <AudioVisualizerUI
        audio={audio}
        smoothingTimeConstant={smoothingTimeConstant}
        fftSize={fftSize}
      />
      <Canvas {...canvasProps}>
        <AudioVisualizerContextProvider.Provider value={context}>
          {children}
        </AudioVisualizerContextProvider.Provider>
      </Canvas>
    </AudioVisualizerProvider>
  );
};
