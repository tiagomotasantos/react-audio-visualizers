import { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';
import { AudioVisualizerCommonProps, AudioVisualizerProps } from './AudioVisualizer';

export const AudioVisualizerScene = ({
  children,
  canvasProps,
}: AudioVisualizerProps & Pick<AudioVisualizerCommonProps, 'canvasProps'>) => {
  const context = useContext(AudioVisualizerContextProvider);

  return (
    <Canvas {...canvasProps}>
      <AudioVisualizerContextProvider.Provider value={context}>
        {children}
      </AudioVisualizerContextProvider.Provider>
    </Canvas>
  );
};
