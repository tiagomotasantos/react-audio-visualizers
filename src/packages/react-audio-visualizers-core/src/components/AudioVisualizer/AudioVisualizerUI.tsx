import { useRef, useContext, useEffect } from 'react';
import { AudioVisualizerController } from './AudioVisualizerController';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';

interface AudioVisualizerUIProps {
  audio: string;
  smoothingTimeConstant?: number;
  fftSize?: number;
}

export const AudioVisualizerUI = ({
  audio,
  smoothingTimeConstant,
  fftSize,
}: AudioVisualizerUIProps) => {
  const context = useContext(AudioVisualizerContextProvider);
  const controller = useRef<AudioVisualizerController>(new AudioVisualizerController(
    context, smoothingTimeConstant, fftSize
  ));
  
  useEffect(() => {
    const visualizerController = controller.current;
    
    visualizerController.loadAudio(audio);

    return () => {
      visualizerController.clean();
    };
  }, [audio]);

  return (
    <div>
      ADD PLAY/PAUSE UI HERE
    </div>
  );
};
