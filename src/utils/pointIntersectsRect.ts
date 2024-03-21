import { Point } from '../Point.class';
import { PointArray } from '../PointArray.type';
import { Rect } from '../Rect.class';

/**
 * Check if a point is inside a rectangle.
 * @param point the point to check
 * @param rect the rectangle to check
 * @returns true if the point is inside the rectangle, false otherwise
 */
export function pointIntersectsRect(
  point: Point | PointArray,
  rect: Rect,
): boolean {
  let newPoint: Point;
  if (point instanceof Point) {
    newPoint = new Point(point.x, point.y);
  } else {
    newPoint = new Point(point[0], point[1]);
  }
  if (rect.angle !== 0) {
    newPoint.rotate(-rect.angle, rect.center);
  }
  return (
    newPoint.x >= rect.left &&
    newPoint.x <= rect.right &&
    newPoint.y >= rect.top &&
    newPoint.y <= rect.bottom
  );
}
