import { useMemo } from 'react';
import * as THREE from 'three';

const WIDTH = 0.12;
const CURVE_HEIGHT = 0.06;

interface BarProps {
  position: [number, number];
  height: number;
}

export const Bar = ({ position: [x, y], height }: BarProps) => {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    const xWidth = x + WIDTH;
    const yHeight = y + height;

    shape.currentPoint = new THREE.Vector2(x, y);
    shape.lineTo(x, yHeight);
    shape.bezierCurveTo(x, yHeight, x + WIDTH / 2, yHeight + CURVE_HEIGHT, xWidth, yHeight);
    shape.lineTo(xWidth, y);
    shape.bezierCurveTo(xWidth, y, x + WIDTH / 2, y - CURVE_HEIGHT, x, y);

    return shape;
  }, [x, y, height]);

  return (
    <mesh>
      <shapeBufferGeometry args={[shape]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};
