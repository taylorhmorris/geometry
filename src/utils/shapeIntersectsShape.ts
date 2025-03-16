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

export function shapeIntersectsPoint(shape: Shape, point: Point): boolean {
  if (shape instanceof Circle) {
    return shape.collidePoint(point);
  }
  if (shape instanceof Rect) {
    return shape.collidePoint(point);
  }
  if (shape instanceof Point) {
    return shape.collidePoint(point);
  } else {
    return point.collidePoint(shape);
  }
}

export function shapeIntersectsCircle(shape: Shape, circle: Circle): boolean {
  if (shape instanceof Circle) {
    return circle.collideCircle(shape);
  }
  if (shape instanceof Rect) {
    return circle.collideRect(shape);
  }
  if (shape instanceof Point) {
    return circle.collidePoint(shape);
  } else {
    return circle.collidePoint(Point.from(shape));
  }
}

export function shapeIntersectsShape(shape1: Shape, shape2: Shape): boolean {
  if (shape1 instanceof Point) {
    return shapeIntersectsPoint(shape2, shape1 as Point);
  }
  if (shape1 instanceof Rect) {
    return shapeIntersectsRect(shape2, shape1 as Rect);
  }
  if (shape1 instanceof Circle) {
    return shapeIntersectsCircle(shape2, shape1 as Circle);
  }
  return shapeIntersectsPoint(shape2, Point.from(shape1));
}
