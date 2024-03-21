import { Circle, Point, PointArray, Rect } from '../index';
import { pointIntersectsRect } from './pointIntersectsRect';

export type Shape = Rect | Circle | Point | PointArray;

export function shapeIntersectsRect(shape: Shape, rect: Rect): boolean {
  if (shape instanceof Rect) {
    return rect.collideRect(shape);
  } else if (shape instanceof Circle) {
    return shape.collideRect(rect);
  } else {
    return pointIntersectsRect(shape, rect);
  }
}

export function shapeIntersectsShape(shape1: Shape, shape2: Shape): boolean {
  if (shape1 instanceof Rect) {
    return shapeIntersectsRect(shape2, shape1 as Rect);
  }
  if (shape1 instanceof Circle) {
    if (shape2 instanceof Circle) {
      return shape1.collideCircle(shape2);
    }
    if (shape2 instanceof Rect) {
      return shape1.collideRect(shape2);
    }
    if (shape2 instanceof Point) {
      return shape1.collidePoint(shape2);
    } else {
      return shape1.collidePoint(Point.from(shape2));
    }
  }
  return shapeIntersectsShape(shape2, shape1);
}
