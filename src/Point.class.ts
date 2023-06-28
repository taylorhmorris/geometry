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
   * Constructs a new copy of a given {@link Point}
   *
   * @param other {@link Point} to copy
   * @returns the new copy of the given {@link Point}
   *
   * @beta
   */
  public static copy(other: Point): Point {
    return new Point(other.x, other.y);
  }
  /**
   * Alias for {@link Point.copy}
   */
  public static from(other: Point): Point {
    return Point.copy(other);
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
  public static rotate(point: Point, theta: number, origin: Point = new Point(0, 0)): Point {
    const copy = Point.copy(point);
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
   * Updates the {@link Point} to equal the given {@link Point}
   * @param other the {@link Point} to copy
   *
   * @beta
   */
  public from(other: Point) {
    this.x = other.x;
    this.y = other.y;
  }
  /**
   * Alias for {@link Point#from}
   */
  public copy(other: Point) {
    this.from(other);
  }
}
