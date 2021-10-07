import { useEffect, useRef, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { BufferGeometry, Vector2 } from 'three';
import { AudioVisualizerUtils, Color, useAudioVisualizerContext } from 'react-audio-visualizers-core';
import {
  DEFAULT_MARGIN_HEIGHT_BOTTOM,
  DEFAULT_MARGIN_HEIGHT_TOP,
  DEFAULT_MARGIN_WIDTH,
  DEFAULT_NUM_BARS,
  MAX_DECIBEL,
  MIN_BAR_HEIGHT,
  MIN_DECIBEL,
  REFERENCE_SPECTRUM_WIDTH,
  SpectrumVisualizerProps
} from './SpectrumVisualizer';

interface LineSpectrumVisualizerProps extends Pick<
  SpectrumVisualizerProps, 'lowFrequency' | 'highFrequency' | 'numBars'
> {
  color?: Color;
}

export const LineSpectrumVisualizer = ({
  numBars,
  color,
  lowFrequency,
  highFrequency,
}: LineSpectrumVisualizerProps) => {
  const { audioContext, analyser } = useAudioVisualizerContext();
  const { viewport: { width: viewportWidth, height: viewportHeight } } = useThree();
  const spectrumWidth = viewportWidth - DEFAULT_MARGIN_WIDTH;
  const halfSpectrumWidth = spectrumWidth / 2;
  const halfSpectrumHeight = viewportHeight / 2;
  const nPoints = numBars || Math.round(viewportWidth * DEFAULT_NUM_BARS / REFERENCE_SPECTRUM_WIDTH);
  const spacing = spectrumWidth / nPoints;
  const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 0);
  const interval = AudioVisualizerUtils.getFrequencyInterval(lowFrequency, highFrequency, nPoints, dataArray,  audioContext?.sampleRate);
  const ref = useRef<BufferGeometry>();
  const line = useMemo(() => (
    <line>
      <bufferGeometry ref={ref} />
      <lineBasicMaterial color={color} />
    </line>
  ), [ref, color]);

  useEffect(() => {
    ref.current?.setFromPoints(Array.from(Array(nPoints), (_, i) => {
      const x = spacing * i - halfSpectrumWidth;
      const y = -halfSpectrumHeight + DEFAULT_MARGIN_HEIGHT_BOTTOM;

      return new Vector2(x, y);
    }));
  }, [nPoints, spacing, halfSpectrumWidth, halfSpectrumHeight]);

  useFrame(() => {
    if (analyser && audioContext && ref.current) {
      analyser.getByteFrequencyData(dataArray);
      
      const filteredData = AudioVisualizerUtils.filterFrequencies(lowFrequency, highFrequency, dataArray, audioContext.sampleRate);

      for (let i = 0; i < nPoints; i++) {
        const height = AudioVisualizerUtils.map(filteredData[i * interval], MIN_DECIBEL, MAX_DECIBEL, MIN_BAR_HEIGHT, viewportHeight - DEFAULT_MARGIN_HEIGHT_TOP) || MIN_BAR_HEIGHT;

        ref.current.attributes.position.setY(i, height - halfSpectrumHeight);
        ref.current.attributes.position.needsUpdate = true;
      }
    }
  });

  return line;
};
