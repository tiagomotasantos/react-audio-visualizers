import { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { AudioVisualizerContextProvider, AudioVisualizerProvider } from './AudioVisualizerProvider';
import { AudioVisualizerProps, AudioVisualizerCommonProps } from './AudioVisualizer.types';
import { AudioVisualizerUI } from './AudioVisualizerUI';

export const AudioVisualizer = ({ children, audio }: AudioVisualizerProps & AudioVisualizerCommonProps) => {
  const context = useContext(AudioVisualizerContextProvider);

  return (
    <AudioVisualizerProvider>
      <AudioVisualizerUI audio={audio} />
      <Canvas>
        <AudioVisualizerContextProvider.Provider value={context}>
          {children}
        </AudioVisualizerContextProvider.Provider>
      </Canvas>
    </AudioVisualizerProvider>
  );
};
