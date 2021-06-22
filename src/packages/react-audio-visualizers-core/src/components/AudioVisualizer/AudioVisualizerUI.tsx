import { ChangeEvent, useRef, useState, useContext, useEffect } from 'react';
import { AudioVisualizerController } from './AudioVisualizerController';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';

interface AudioVisualizerUIProps {
  audio: string;
}

export const AudioVisualizerUI = ({ audio }: AudioVisualizerUIProps) => {
  const context = useContext(AudioVisualizerContextProvider);
  const controller = useRef<AudioVisualizerController>(new AudioVisualizerController(context));
  
  useEffect(() => {
    const visualizerController = controller.current;
    
    visualizerController.loadAudio(audio);

    return () => {
      visualizerController.clean();
    };
  }, []);

  return (
    <div>
      ADD PLAY/PAUSE UI HERE
    </div>
  );
};
