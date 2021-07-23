import { Color } from 'packages/react-audio-visualizers-core/src';
import { useMemo } from 'react';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { DEFAULT_COLOR } from './SpectrumVisualizer';

interface SquaredBarProps {
  position: [number, number];
  height: number;
  width: number;
  color?: Color;
}

export const SquaredBar = ({
  position: [x, y],
  height,
  width,
  color = DEFAULT_COLOR,
}: SquaredBarProps) => {
  const planeRef = useRef<Mesh>();
  const mesh = useMemo(() => (
    <mesh ref={planeRef}>
      <planeBufferGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  ), [color, planeRef]);

  useEffect(() => {
    planeRef.current?.position.setX(x);
    planeRef.current?.position.setY(y);
  }, [x, y]);

  useEffect(() => {
    const meshPosition = planeRef.current?.geometry.attributes.position!;

    meshPosition.setY(0, height);
    meshPosition.setY(1, height);
    meshPosition.setX(1, width);
    meshPosition.setX(3, width);
    meshPosition.needsUpdate = true;
  }, [height, width]);

  return mesh;
};
