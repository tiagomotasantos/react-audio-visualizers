import { AudioVisualizerProps, AudioVisualizerCommonProps } from './AudioVisualizer.types';

export const AudioVisualizer = ({ children, audio }: AudioVisualizerProps & AudioVisualizerCommonProps) => {

  return (
    <div>
      {children}
    </div>
  );
};
