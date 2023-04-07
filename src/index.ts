import { Rect as RectClass } from './Rect.class';
import { Vector as VectorClass } from './Vector.class';
import { Circle as CircleClass } from './Circle.class';
import { Face as FaceEnum } from './Face.enum';
import { PointArray as PointArrayType } from './PointArray.type';

/**
 * {@link PointArray}
 */
export type PointArray = PointArrayType;

/**
 * {@link Rect}
 */
export const Rect = RectClass;
/**
 * {@link Rect}
 */
export type Rect = RectClass;

/**
 * {@link Vector}
 */
export const Vector = VectorClass;
/**
 * {@link Vector}
 */
export type Vector = VectorClass;

/**
 * {@link Circle}
 */
export const Circle = CircleClass;
export type Circle = CircleClass;

/**
 * {@link Face}
 */
export const Face = FaceEnum;
export type Face = FaceEnum;

export default { Rect: Rect, Vector: Vector, Circle: Circle, Face: Face };
