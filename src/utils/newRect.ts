import { Rect } from '../Rect.class';

/**
 * Create a new Rect object from the top-left and bottom-right corners.
 *
 * @param x1 x parameter of the top-left corner
 * @param y1 y parameter of the top-left corner
 * @param x2 x parameter of the bottom-right corner
 * @param y2 y parameter of the bottom-right corner
 * @returns the new Rect object
 */
export function newRect(x1: number, y1: number, x2: number, y2: number) {
  const rect = new Rect(
    x1 + (x2 - x1) / 2,
    y1 + (y2 - y1) / 2,
    x2 - x1,
    y2 - y1,
  );
  return rect;
}
