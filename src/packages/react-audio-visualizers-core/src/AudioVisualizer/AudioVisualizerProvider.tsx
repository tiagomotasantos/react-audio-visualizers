import React, { useState, FC } from 'react';
import { AudioVisualizerStatus } from '../types';

export interface AudioVisualizerContext {
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  status: AudioVisualizerStatus;
  setAudioContext: (audioContext: AudioContext) => void;
  setAnalyser: (analyser: AnalyserNode) => void;
  setStatus: (status: AudioVisualizerStatus) => void;
}

const initialState = {} as AudioVisualizerContext;

export const AudioVisualizerContextProvider = React.createContext<AudioVisualizerContext>(initialState);

export const AudioVisualizerProvider: FC = ({ children }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [status, setStatus] = useState<AudioVisualizerStatus>(AudioVisualizerStatus.paused);

  return (
    <AudioVisualizerContextProvider.Provider
      value={{
        audioContext,
        analyser,
        status,
        setAudioContext,
        setAnalyser,
        setStatus,
      }}
    >
      {children}
    </AudioVisualizerContextProvider.Provider>
  );
};