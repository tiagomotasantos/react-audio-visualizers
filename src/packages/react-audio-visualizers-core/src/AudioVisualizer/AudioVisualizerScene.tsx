import { CSSProperties, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';
import { AudioVisualizerCommonProps, AudioVisualizerProps } from './AudioVisualizer';

export const AudioVisualizerScene = ({
  children,
  canvasProps,
  backgroundColor,
  backgroundImage,
}: AudioVisualizerProps & Pick<AudioVisualizerCommonProps, 'canvasProps' | 'backgroundColor' | 'backgroundImage'>) => {
  const context = useContext(AudioVisualizerContextProvider);
  const style: CSSProperties = {
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
  };

  return (
    <Canvas style={style} {...canvasProps}>
      <AudioVisualizerContextProvider.Provider value={context}>
        {children}
      </AudioVisualizerContextProvider.Provider>
    </Canvas>
  );
};
