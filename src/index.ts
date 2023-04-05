import { Rect as RectClass } from './Rect.class';
import { Vector as VectorClass } from './Vector.class';
import { Circle as CircleClass } from './Circle.class';
import { Face as FaceEnum } from './Face.enum';
import { PointArray as PointArrayType } from './PointArray.type';

export type PointArray = PointArrayType;

export const Rect = RectClass;
export type Rect = RectClass;

export const Vector = VectorClass;
export type Vector = VectorClass;

export const Circle = CircleClass;
export type Circle = CircleClass;

export const Face = FaceEnum;
export type Face = FaceEnum;

export default { Rect: Rect, Vector: Vector, Circle: Circle, Face: Face };
