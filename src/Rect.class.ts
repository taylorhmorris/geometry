import { Face } from './Face.enum';
import { Point } from './Point.class';
import { PointArray } from './PointArray.type';
import { Vector } from './Vector.class';

/**
 * A class for axis-aligned Rectangles.
 *
 * @
 * @alpha
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
   * Constructs a new copy of a given {@link Rect}
   *
   * @param other {@link Rect} to copy
   * @returns the new copy of the given {@link Rect}
   *
   * @deprecated Use {@link Rect.from} instead.
   */
  public static copy(other: Rect): Rect {
    return Rect.from(other);
  }
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
   * Creates a new {@link Rect} rotated from the given {@link Rect}.
   *
   * @param rect the {@link Rect} to rotate
   * @param theta the amount in radians to rotate
   * @param origin the origin to rotate around (default: (0, 0))
   *
   * @returns a new {@link Rect} rotated around the given {@link Point}
   * @alpha
   */
  public static rotate(
    rect: Rect,
    theta: number,
    origin: Point = new Point(0, 0),
  ): Rect {
    const copy = Rect.from(rect);
    copy.rotate(theta, origin);
    return copy;
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
   * @returns a copy of the {@link Rect}
   */
  public copy(): Rect {
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
   * @deprecated use {@link Rect.centerPoint} and {@link Point.array} instead.
   * Will be replaced by centerPoint in the future.
   *
   * The center of the {@link Rect}
   */
  public get center(): PointArray {
    return [this.x, this.y];
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
   * The center of the {@link Rect} as a {@link Point}.
   */
  public get centerPoint(): Point {
    return new Point(this.x, this.y);
  }
  public set centerPoint(value: Point | PointArray) {
    this.center = value;
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
   * @deprecated use {@link Rect.centerPoint} and {@link Point.array} instead.
   * The position of the {@link Rect} (equivalent to {@link Rect.center})
   */
  public get position(): PointArray {
    return [this.x, this.y];
  }
  public set position(value: PointArray) {
    this.x = value[0];
    this.y = value[1];
  }

  /**
   * The position of the {@link Rect} (equivalent to {@link Rect.center})
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
   * Checks if an x coordinate crosses the {@link Rect}
   * @param x the x coordinate to check
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideX(x: number): boolean {
    return this.left <= x && this.right >= x;
  }

  /**
   * Checks if a y coordinate crosses the {@link Rect}
   *
   * @param y the y coordinate to check
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideY(y: number): boolean {
    return this.top <= y && this.bottom >= y;
  }

  /**
   * Checks if an x, y coordinate touches the {@link Rect}
   *
   * @param x the x coordinate to check
   * @param y the y coordinate to check
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideXY(x: number, y: number): boolean {
    return this.collideX(x) && this.collideY(y);
  }

  /**
   * Checks if a {@link PointArray} touches the {@link Rect}
   *
   * @param point the {@link PointArray} to check
   * @returns `true` or `false`
   *
   * @beta
   */
  public collidePointArray(point: PointArray): boolean {
    return this.collideXY(point[0], point[1]);
  }

  /**
   * Checks if a {@link Point} touches the {@link Rect}
   *
   * @param point the {@link Point} to check
   * @returns `true` or `false`
   *
   * @beta
   */
  public collidePoint(point: Point | PointArray): boolean {
    if (point instanceof Point) return this.collideXY(point.x, point.y);
    return this.collidePointArray(point);
  }

  /**
   * Checks if two {@link Rect}s collide
   *
   * @param rect another {@link Rect}
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideRect(rect: Rect): boolean {
    const thisMaxDimension = Math.max(this._height, this._width);
    const rectMaxDimension = Math.max(rect._height, rect._width);
    if (Math.abs(this.x - rect.x) > thisMaxDimension + rectMaxDimension)
      return false;
    return (
      rect.left < this.right &&
      rect.right > this.left &&
      rect.top < this.bottom &&
      rect.bottom > this.top
    );
  }

  /**
   *
   * @param rect another {@link Rect}
   * @param moveVector the movement {@link Vector}
   * @returns
   *
   * @alpha
   */
  public collisionFace(
    rect: Readonly<Rect>,
    moveVector: Readonly<Vector>,
  ): Face {
    if (moveVector.y === 0 && moveVector.x == 0) {
      return Face.NONE;
    } else if (this.collideXY(rect.x, rect.y)) {
      return Face.NONE;
    }
    const distX = rect.x - this.x;
    const distY = rect.y - this.y;
    if (Math.abs(distX) > Math.abs(distY)) {
      if (distX < 0) {
        return Face.LEFT;
      }
      return Face.RIGHT;
    }
    if (distY < 0) {
      return Face.TOP;
    }
    return Face.BOTTOM;
  }

  /**
   * Align the {@link Rect} to a specific face of another {@link Rect}
   * @param other the other {@link Rect}
   * @param face the face to align
   *
   * @alpha
   */
  public alignToFace(other: Rect, face: Face) {
    switch (face) {
      case Face.TOP: {
        this.bottom = other.top;
        break;
      }
      case Face.BOTTOM: {
        this.top = other.bottom;
        break;
      }
      case Face.RIGHT: {
        this.left = other.right;
        break;
      }
      case Face.LEFT: {
        this.right = other.left;
        break;
      }
      case Face.NONE: {
        break;
      }
    }
  }

  /**
   * Align the {@link Rect} to another {@link Rect} along a line
   * @param other the other {@link Rect}
   * @param direction the direction to move the {@link Rect}
   *
   * @alpha
   */
  public alignTo(other: Rect, direction: [number, number] | Vector) {
    let v: Vector;
    if (direction instanceof Vector) {
      v = direction;
    } else {
      v = new Vector(direction[0], direction[1]);
    }

    const m = Math.abs(v.y / v.x);

    const distLR = this.left - other.right;
    const distRL = this.right - other.left;
    const distTB = this.top - other.bottom;
    const distBT = this.bottom - other.top;

    const distX = Math.abs(distLR) < Math.abs(distRL) ? distLR : distRL;
    const distY = Math.abs(distTB) < Math.abs(distBT) ? distTB : distBT;

    if (Math.abs(distX) < Math.abs(distY) && v.x != 0) {
      this.x -= distX;
      if (v.y && m) {
        this.y -= distX * m;
      }
    } else if (Math.abs(distY) <= Math.abs(distX) && v.y != 0) {
      this.y += -distY;
      if (v.x && m) {
        this.x += -distY / m;
      }
    }
  }

  /**
   * Resizes the {@link Rect} leaving its center in the same place
   *
   * @param size the new size for the {@link Rect}
   *
   * @beta
   */
  public resizeAndRecenter(size: Point | PointArray) {
    const center: PointArray = this.center;
    if (size instanceof Point) {
      this.width = size.x;
      this.height = size.y;
    } else {
      this.width = size[0];
      this.height = size[1];
    }
    this.center = center;
  }

  /**
   * Move the {@link Rect} to a new position
   *
   * @param position the new position
   */
  public teleportTo(position: Point | PointArray) {
    if (position instanceof Point) {
      this.center = [position.x, position.y];
    } else {
      this.center = position;
    }
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
}
