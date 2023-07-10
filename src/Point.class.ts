import { PointArray } from './PointArray.type';

/**
 * A class for a `Point`
 *
 * @alpha
 */
export class Point {
  /** The x coordinate of the {@link Point} */
  x: number;
  /** The y coordinate of the {@link Point} */
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * @deprecated Use {@link Point.from} instead.
   */
  public static copy(other: Point | PointArray): Point {
    return Point.from(other);
  }

  /**
   * Constructs a new Point from a given {@link Point} or {@link PointArray}
   *
   * @param other {@link Point} or {@link PointArray} to copy
   * @returns the new {@link Point}
   *
   * @beta
   */
  public static from(other: Point | PointArray): Point {
    if (other instanceof Point) return Point.from(other);
    return new Point(other[0], other[1]);
  }
  /**
   *
   * @param point the point to rotate
   * @param theta the amount in radians to rotate
   * @param origin the origin to rotate around (default: (0, 0))
   *
   * @returns a new {@link Point} rotated around the given {@link Point}
   * @alpha
   */
  public static rotate(
    point: Point,
    theta: number,
    origin: Point = new Point(0, 0),
  ): Point {
    const copy = Point.from(point);
    copy.rotate(theta, origin);
    return copy;
  }

  /**
   * Rotates the given point by theta around a given origin
   *
   * @param point the point to rotate
   * @param theta the amount in radians to rotate
   * @param origin the origin to rotate around (default: (0, 0))
   *
   * @alpha
   */
  public rotate(theta: number, origin: Point = new Point(0, 0)) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    this.x -= origin.x;
    this.y -= origin.y;
    const newX = cos * this.x - sin * this.y;
    const newY = sin * this.x + cos * this.y;
    this.x = newX + origin.x;
    this.y = newY + origin.y;
  }

  /**
   * Updates the {@link Point} to equal the given {@link Point} or {@link PointArray}
   * @param other the {@link Point} or {@link PointArray} to copy
   *
   * @beta
   */
  public from(other: Point | PointArray) {
    if (other instanceof Point) {
      this.x = other.x;
      this.y = other.y;
    } else {
      this.x = other[0];
      this.y = other[1];
    }
  }
  /**
   * @returns a copy of the {@link Point}
   */
  public copy(): Point {
    return Point.from(this);
  }
}
