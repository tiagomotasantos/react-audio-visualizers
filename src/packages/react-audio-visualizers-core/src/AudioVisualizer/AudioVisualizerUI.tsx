import { useRef, useCallback, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Audio } from '../types';
import { MainAction, MainActionRender } from './AudioVisualizer';
import { AudioVisualizerController } from './AudioVisualizerController';
import { AudioVisualizerContextProvider } from './AudioVisualizerProvider';
import { LoaderIcon, PlayIcon, PauseIcon } from './icons';
import { MainActionButton } from './MainActionButton';

const DEFAULT_ICONS_COLOR = 'white';
const DEFAULT_SHOW_MAIN_ACTION_ICON = false;
const DEFAULT_SHOW_LOADER_ICON = false;

interface AudioVisualizerUIProps {
  audio?: Audio;
  smoothingTimeConstant?: number;
  fftSize?: number;
  volume?: number;
  iconsColor?: string;
  mainActionRender?: (action: MainAction) => MainActionRender;
  showMainActionIcon?: boolean;
  showLoaderIcon?: boolean;
}

export const AudioVisualizerUI = ({
  audio,
  smoothingTimeConstant,
  fftSize,
  volume,
  mainActionRender,
  iconsColor = DEFAULT_ICONS_COLOR,
  showMainActionIcon = DEFAULT_SHOW_MAIN_ACTION_ICON,
  showLoaderIcon = DEFAULT_SHOW_LOADER_ICON,
}: AudioVisualizerUIProps) => {
  const context = useContext(AudioVisualizerContextProvider);
  const controller = useRef<AudioVisualizerController>(new AudioVisualizerController(
    context, smoothingTimeConstant, fftSize
  ));
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [loading, setLoading] = useState(false);
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
      visualizerController.loadAudio(audio, setLoading);
    }
  }, [audio]);

  useEffect(() => {
    const visualizerController = controller.current;

    if (volume !== undefined && !isNaN(volume)) {
      visualizerController.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (mainActionRender) {
      const { id, node } = mainActionRender({ play, pause });
      const container = document.getElementById(id);

      if (container) {
        ReactDOM.render(node, container);
      }
    }
  }, [mainActionRender, play, pause]);

  return (
    <div className="audio-visualizer-ui">
      {showLoaderIcon && loading ? (
        <LoaderIcon color={iconsColor} />
      ) : (
        audio && !loading && (
          playing ? (
            <MainActionButton onClick={pause} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {showMainActionIcon && hovering && <PauseIcon fill={iconsColor} />}
            </MainActionButton>
          ) : (
            <MainActionButton onClick={play} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {showMainActionIcon && hovering && <PlayIcon fill={iconsColor} />}
            </MainActionButton>
          )
        )
      )}
    </div>
  );
};
