import { Circle } from './Circle.class';
import { Point } from './Point.class';
import { PointArray } from './PointArray.type';
import { Vector } from './Vector.class';
import { pointIntersectsRect } from './utils/pointIntersectsRect';
import { shapeIntersectsRect } from './utils/shapeIntersectsShape';

/**
 * A class for Rectangles.
 *
 * @beta
 */
export class Rect {
  /** The x coordinate of the {@link Rect} */
  x: number;
  /** The y coordinate of the {@link Rect} */
  y: number;
  _width: number;
  _height: number;
  /** The angle of rotation of the {@link Rect} in radians */
  angle: number;

  /**
   * Constructs a new {@link Rect} from a given {@link Rect}
   *
   * @param other {@link Rect} to copy
   * @returns the new {@link Rect}
   *
   * @beta
   */
  public static from(other: Rect): Rect {
    return new Rect(other.x, other.y, other._width, other._height, other.angle);
  }

  /**
   * The constructor of the {@link Rect} class
   *
   * @param x the x position of the {@link Rect}
   * @param y the y position of the {@link Rect}
   * @param width the width of the {@link Rect}
   * @param height the height of the {@link Rect}
   * @param angle the angle of rotation of the {@link Rect} in radians (default: 0)
   *
   * @beta
   */
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    angle: number = 0,
  ) {
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
    this.angle = angle;
  }

  /**
   * Updates the {@link Rect} to equal the given {@link Rect}
   * @param other the {@link Rect} to copy
   *
   * @beta
   */
  public from(other: Rect) {
    this.x = other.x;
    this.y = other.y;
    this._width = other._width;
    this._height = other._height;
    this.angle = other.angle;
  }

  /**
   * Creates a deep copy of the {@link Rect}
   * @returns a new {@link Rect} with the same properties as the original
   */
  public clone(): Rect {
    return Rect.from(this);
  }

  /**
   * The x position of the right side of the {@link Rect}
   */
  public get right(): number {
    return this.x + this.width / 2;
  }
  public set right(value: number) {
    this.x = value - (this.right - this.x);
  }

  /**
   * The x position of the left side of the {@link Rect}
   */
  public get left(): number {
    return this.x - this.width / 2;
  }
  public set left(value: number) {
    this.x = value - (this.left - this.x);
  }

  /**
   * The y position of the top side of the {@link Rect}
   */
  public get top(): number {
    return this.y - this._height / 2;
  }
  public set top(value: number) {
    this.y = value - (this.top - this.y);
  }

  /**
   * The y position of the bottom side of the {@link Rect}
   */
  public get bottom(): number {
    return this.y + this._height / 2;
  }
  public set bottom(value: number) {
    this.y = value - (this.bottom - this.y);
  }

  /**
   * Get the center of the {@link Rect} as a {@link Point}.
   *
   * (use {@link Rect.center}.{@link Point.array} to get the center as a {@link PointArray}).
   *
   * @returns the center of the {@link Rect}
   */
  public get center(): Point {
    return new Point(this.x, this.y);
  }
  public set center(value: Point | PointArray) {
    if (value instanceof Array) {
      this.x = value[0];
      this.y = value[1];
    } else {
      this.x = value.x;
      this.y = value.y;
    }
  }

  /**
   * The width of the {@link Rect}
   */
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }

  /**
   * The height of the {@link Rect}
   */
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  /**
   * The points of the {@link Rect} as an array of {@link Point}s
   */
  public get points(): [Point, Point, Point, Point] {
    const top_left = new Point(this.left, this.top);
    const top_right = new Point(this.right, this.top);
    const bottom_left = new Point(this.left, this.bottom);
    const bottom_right = new Point(this.right, this.bottom);
    const points: [Point, Point, Point, Point] = [
      top_left,
      top_right,
      bottom_right,
      bottom_left,
    ];
    for (const point of points) {
      point.rotate(this.angle, this.center);
    }
    return points;
  }

  /**
   * Checks if a {@link Point} touches the {@link Rect}
   *
   * @param point the {@link Point} to check
   * @returns `true` if the point is inside the {@link Rect}, `false` otherwise
   *
   * @beta
   */
  public collidePoint(point: Point | PointArray): boolean {
    return pointIntersectsRect(point, this);
  }

  /**
   * Checks if a {@link Rect} overlaps the {@link Rect} on a given axis
   * @param other another {@link Rect}
   * @returns the magnitude of the overlap
   * @beta
   */
  private singleAxisOverlap(
    other: Readonly<Rect>,
    axis: Readonly<Vector>,
  ): number {
    const thisPoints = this.points;
    const otherPoints = other.points;
    const localAxis = Vector.from(axis);
    localAxis.magnitude = 1;
    let thisMin = localAxis.dotProduct(thisPoints[0]);
    let thisMax = thisMin;
    let otherMin = localAxis.dotProduct(otherPoints[0]);
    let otherMax = otherMin;
    for (const point of thisPoints) {
      const dot = localAxis.dotProduct(point);
      thisMin = Math.min(thisMin, dot);
      thisMax = Math.max(thisMax, dot);
    }
    for (const point of otherPoints) {
      const dot = localAxis.dotProduct(point);
      otherMin = Math.min(otherMin, dot);
      otherMax = Math.max(otherMax, dot);
    }
    if (thisMin > otherMax || otherMin > thisMax) return 0;
    const overlap1 = thisMin - otherMax;
    const overlap2 = thisMax - otherMax;
    if (Math.abs(overlap1) < Math.abs(overlap2)) return overlap1;
    return overlap2;
  }
  /**
   * Checks if two {@link Rect}s overlap
   *
   * @param other another {@link Rect}
   * @returns the magnitude of the overlap
   *
   * @beta
   */
  public overlapRect(other: Readonly<Rect>): number {
    const thisPoints = this.points;
    const otherPoints = other.points;
    const axes: Vector[] = [];
    for (let i = 0; i < thisPoints.length - 1; i++) {
      axes.push(
        new Vector(
          -(thisPoints[i + 1].y - thisPoints[i].y),
          thisPoints[i + 1].x - thisPoints[i].x,
        ),
      );
    }
    for (let i = 0; i < otherPoints.length - 1; i++) {
      axes.push(
        new Vector(
          -(otherPoints[i + 1].y - otherPoints[i].y),
          otherPoints[i + 1].x - otherPoints[i].x,
        ),
      );
    }
    let smallestOverlap = Infinity;
    for (const axis of axes) {
      const overlap = Math.abs(this.singleAxisOverlap(other, axis));
      if (overlap === 0) return 0;
      smallestOverlap = Math.min(smallestOverlap, overlap);
    }
    return smallestOverlap;
  }

  /**
   * Checks if two {@link Rect}s collide
   *
   * @param other another {@link Rect}
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideRect(other: Rect): boolean {
    if (
      this.x === other.x &&
      this.y === other.y &&
      this.width === other.width &&
      this.height === other.height &&
      this.angle === other.angle
    )
      return true;
    return this.overlapRect(other) !== 0;
  }

  /**
   * Resizes the {@link Rect} leaving its center in the same place
   *
   * @param size the new size for the {@link Rect}
   *
   * @beta
   */
  public resizeAndRecenter(size: Point | PointArray) {
    this.width = size instanceof Point ? Math.abs(size.x) : Math.abs(size[0]);
    this.height = size instanceof Point ? Math.abs(size.y) : Math.abs(size[1]);
  }

  /**
   * Move the {@link Rect} to a new position
   *
   * @param position the new position
   */
  public teleportTo(position: Point | PointArray) {
    this.center = position;
  }

  /**
   * Rotates the {@link Rect} by theta around a given origin
   *
   * @param theta the amount in radians to rotate
   * @param origin the origin {@link Point} to rotate around (default: Rect.center))
   *
   * @alpha
   */
  public rotate(
    theta: number,
    origin: Point | PointArray = new Point(this.x, this.y),
  ) {
    const centerPoint = Point.from(this.center);
    centerPoint.rotate(theta, origin);
    this.x = centerPoint.x;
    this.y = centerPoint.y;
    this.angle += theta;
  }

  /**
   * Calculates the perimeter of the {@link Rect}
   *
   * @returns the perimeter of the {@link Rect}
   */
  public get perimeter(): number {
    return 2 * (this.width + this.height);
  }

  /**
   * Calculates the area of the {@link Rect}
   *
   * @returns the area of the {@link Rect}
   */
  public get area(): number {
    return this.width * this.height;
  }

  /**
   * Checks for intersection with another shape
   * @param other the other shape to check for intersection
   * @returns `true` if the shapes intersect, `false` otherwise
   */
  public intersects(other: Rect | Point | PointArray | Circle): boolean {
    return shapeIntersectsRect(other, this);
  }

  /**
   * @returns string representation of the {@link Rect}
   */
  public toString(): string {
    return `Rect<${this.x}, ${this.y}, ${this.width}, ${this.height}, ${this.angle}θ>`;
  }

  /**
   * @param other the other {@link Rect}
   * @returns if the {@link Rect} is equal to another {@link Rect}
   */
  public equals(other: Rect): boolean {
    return (
      this.x === other.x &&
      this.y === other.y &&
      this.width === other.width &&
      this.height === other.height &&
      this.angle === other.angle
    );
  }
}
