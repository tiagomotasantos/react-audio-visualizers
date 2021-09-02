import { useContext } from 'react';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';

export const useAudioVisualizerContext = () => {
  const { audioContext, analyser, status } = useContext(AudioVisualizerContextProvider);

  return { audioContext, analyser, status };
};
