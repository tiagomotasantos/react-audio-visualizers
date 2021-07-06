import { useMemo } from 'react';
import * as THREE from 'three';
import { Color } from './types';

const WIDTH = 12;
const CURVE_HEIGHT = 6;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color1;
  uniform vec3 color2;

  varying vec2 vUv;

  void main() {
    
    gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
  }
`;

interface BarProps {
  position: [number, number];
  height: number;
  color: Color;
}

export const Bar = ({ position: [x, y], height, color }: BarProps) => {
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
      <shaderMaterial 
        uniforms={{
          color1: { value: new THREE.Color(0xffffff) },
          color2: { value: new THREE.Color(0x000000) }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};
