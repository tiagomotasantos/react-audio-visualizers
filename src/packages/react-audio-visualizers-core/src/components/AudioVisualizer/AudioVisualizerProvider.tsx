import React, { useState, FC } from 'react';

export interface AudioVisualizerContext {
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  setAudioContext: (audioContext: AudioContext) => void;
  setAnalyser: (analyser: AnalyserNode) => void;
}

const initialState = {} as AudioVisualizerContext;

export const AudioVisualizerContextProvider = React.createContext<AudioVisualizerContext>(initialState);

export const AudioVisualizerProvider: FC = ({ children }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  return (
    <AudioVisualizerContextProvider.Provider
      value={{
        audioContext,
        analyser,
        setAudioContext,
        setAnalyser,
      }}
    >
      {children}
    </AudioVisualizerContextProvider.Provider>
  );
};