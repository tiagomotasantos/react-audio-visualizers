import { useRef, useCallback, useContext, useEffect, useState } from 'react';
import { AudioVisualizerController } from './AudioVisualizerController';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';
import { PlayIcon, PauseIcon } from './icons';

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
  const [playing, setPlaying] = useState(false);
  const play = useCallback(() => {
    controller.current.play();
    setPlaying(true);
  }, [controller, setPlaying]);
  const pause = useCallback(() => {
    controller.current.pause();
    setPlaying(false);
  }, [controller, setPlaying]);
  
  useEffect(() => {
    const visualizerController = controller.current;
    
    visualizerController.loadAudio(audio);

    return () => {
      visualizerController.clean();
    };
  }, [audio]);

  return (
    <div className="audio-visualizer-ui">
      {playing ? (
        <button onClick={pause}>
          <PauseIcon />
        </button>
      ) : (
        <button onClick={play}>
          <PlayIcon />
        </button>
      )}

    </div>
  );
};
