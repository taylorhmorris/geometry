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
