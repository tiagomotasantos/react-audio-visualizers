import { useRef, useCallback, useContext, useEffect, useState } from 'react';
import { AudioVisualizerController } from './AudioVisualizerController';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';
import { PlayIcon, PauseIcon } from './icons';
import { MainActionButton } from './MainActionButton';

const DEFAULT_ICONS_COLOR = 'white';

interface AudioVisualizerUIProps {
  audio: string;
  smoothingTimeConstant?: number;
  fftSize?: number;
  iconsColor?: string;
}

export const AudioVisualizerUI = ({
  audio,
  smoothingTimeConstant,
  fftSize,
  iconsColor = DEFAULT_ICONS_COLOR,
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
        <MainActionButton onClick={pause}>
          <PauseIcon fill={iconsColor} />
        </MainActionButton>
      ) : (
        <MainActionButton onClick={play}>
          <PlayIcon fill={iconsColor} />
        </MainActionButton>
      )}

    </div>
  );
};
