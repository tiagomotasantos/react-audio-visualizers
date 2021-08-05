import { CanvasTexture, Texture } from 'three';
import { Color } from 'packages/react-audio-visualizers-core/src';

export class ColorUtils {
  static getColorGradientTexture(colors: Color[]): Texture {
    const length = colors.length;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 32;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const gradient = context.createLinearGradient(0, 0, 0, 32);
    // TODO: handle number colors
    colors.forEach((color, i) => gradient.addColorStop(length === 1 ? 1 : i / (length - 1), color as string));
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1, 32);

    return new CanvasTexture(canvas);
  }
}
