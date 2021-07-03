import { useContext } from 'react';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';

export const useAudioVisualizerContext = () => {
  const { audioContext, analyser } = useContext(AudioVisualizerContextProvider);

  return { audioContext, analyser };
};
