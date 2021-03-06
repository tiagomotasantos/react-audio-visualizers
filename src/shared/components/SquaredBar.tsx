import { Color } from 'react-audio-visualizers-core';
import { createRef, useMemo, useEffect, MutableRefObject } from 'react';
import { BufferGeometry, Mesh, Vector3, } from 'three';
import { ColorUtils } from '../ColorUtils';
import { DEFAULT_COLOR } from '../../SpectrumVisualizer/SpectrumVisualizer';

export interface SquaredBarProps {
  position: [number, number];
  height: number;
  width: number;
  rotation?: number;
  colors?: Color[];
  meshRef?: MutableRefObject<Mesh<BufferGeometry> | null>;
}

export const SquaredBar = ({
  position: [x, y],
  height,
  width,
  rotation = 0,
  meshRef,
  colors = [DEFAULT_COLOR],
}: SquaredBarProps) => {
  const zAxis = useMemo(() => new Vector3(0, 0, 1), []);
  const planeRef = useMemo(() => meshRef || createRef<Mesh>(), [meshRef]);
  const gradient = useMemo(() => ColorUtils.getColorGradientTexture(colors), [colors]);
  const mesh = useMemo(() => (
    <mesh ref={planeRef}>
      <planeBufferGeometry />
      <meshBasicMaterial map={gradient} />
    </mesh>
  ), [gradient, planeRef]);

  useEffect(() => {
    planeRef.current?.position.setX(x);
    planeRef.current?.position.setY(y);
  }, [planeRef, x, y]);

  useEffect(() => {
    const meshPosition = planeRef.current?.geometry.attributes.position!;

    meshPosition.setY(0, height);
    meshPosition.setY(1, height);
    meshPosition.setX(1, width);
    meshPosition.setX(3, width);
    meshPosition.needsUpdate = true;
  }, [planeRef, height, width]);

  useEffect(() => {
    planeRef.current?.setRotationFromAxisAngle(zAxis, rotation);
  }, [planeRef, zAxis, rotation]);

  return mesh;
};
