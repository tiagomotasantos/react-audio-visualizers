import { Color } from 'packages/react-audio-visualizers-core/src';
import { useMemo } from 'react';
import { Shape, Vector2 } from 'three';
import { DEFAULT_COLOR } from './SpectrumVisualizer';

const CURVE_HEIGHT = 6;

interface RoundBarProps {
  position: [number, number];
  height: number;
  width: number;
  color?: Color;
}

export const RoundBar = ({
  position: [x, y],
  height,
  width,
  color = DEFAULT_COLOR,
}: RoundBarProps) => {
  const shape = useMemo(() => {
    const shape = new Shape();
    const xWidth = x + width;
    const yHeight = y + height;

    shape.currentPoint = new Vector2(x, y);
    shape.lineTo(x, yHeight);
    shape.bezierCurveTo(x, yHeight, x + width / 2, yHeight + CURVE_HEIGHT, xWidth, yHeight);
    shape.lineTo(xWidth, y);
    shape.bezierCurveTo(xWidth, y, x + width / 2, y - CURVE_HEIGHT, x, y);

    return shape;
  }, [x, y, width, height]);

  return (
    <mesh>
      <shapeBufferGeometry args={[shape]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};
