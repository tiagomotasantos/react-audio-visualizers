import { useRef, useCallback, useContext, useEffect, useState } from 'react';
import { Audio } from '../types';
import { AudioVisualizerController } from './AudioVisualizerController';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';
import { PlayIcon, PauseIcon } from './icons';
import { MainActionButton } from './MainActionButton';

const DEFAULT_ICONS_COLOR = 'white';
const DEFAULT_SHOW_MAIN_ACTION_ICON = false;

interface AudioVisualizerUIProps {
  audio?: Audio;
  smoothingTimeConstant?: number;
  fftSize?: number;
  volume?: number;
  iconsColor?: string;
  showMainActionIcon?: boolean;
}

export const AudioVisualizerUI = ({
  audio,
  smoothingTimeConstant,
  fftSize,
  volume,
  iconsColor = DEFAULT_ICONS_COLOR,
  showMainActionIcon = DEFAULT_SHOW_MAIN_ACTION_ICON,
}: AudioVisualizerUIProps) => {
  const context = useContext(AudioVisualizerContextProvider);
  const controller = useRef<AudioVisualizerController>(new AudioVisualizerController(
    context, smoothingTimeConstant, fftSize
  ));
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const play = useCallback(() => {
    controller.current.play();
    setPlaying(true);
  }, [controller, setPlaying]);
  const pause = useCallback(() => {
    controller.current.pause();
    setPlaying(false);
  }, [controller, setPlaying]);
  const onMouseEnter = useCallback(() => setHovering(true), [setHovering]);
  const onMouseLeave = useCallback(() => setHovering(false), [setHovering]);
  
  useEffect(() => {
    const visualizerController = controller.current;
    
    if (audio) {
      visualizerController.loadAudio(audio);
    }
  }, [audio]);

  useEffect(() => {
    const visualizerController = controller.current;

    if (volume !== undefined && !isNaN(volume)) {
      visualizerController.setVolume(volume);
    }
  }, [volume]);

  return (
    <div className="audio-visualizer-ui">
      {audio && (
        playing ? (
          <MainActionButton onClick={pause} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {showMainActionIcon && hovering && <PauseIcon fill={iconsColor} />}
          </MainActionButton>
        ) : (
          <MainActionButton onClick={play} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {showMainActionIcon && hovering && <PlayIcon fill={iconsColor} />}
          </MainActionButton>
        )
      )}
    </div>
  );
};
