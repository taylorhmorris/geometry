import { Face } from './Face.enum';
import { PointArray } from './PointArray.type';
import { Vector } from './Vector.class';

/**
 * A class for Rectangles
 *
 * @alpha
 */
export class Rect {
  /** The x coordinate of the `Rect` */
  x: number;
  /** The y coordinate of the `Rect` */
  y: number;
  _width: number;
  _height: number;

  /**
   * Constructs a new copy of a given `Rect`
   *
   * @param other `Rect` to copy
   * @returns the new copy of the given `Rect`
   *
   * @beta
   */
  public static copy(other: Rect): Rect {
    return new Rect(other.x, other.y, other._width, other._height);
  }

  /**
   * The constructor of the `Rect` class
   *
   * @param x the x position of the `Rect`
   * @param y the y position of the `Rect`
   * @param width the width of the `Rect`
   * @param height the height of the `Rect`
   *
   * @beta
   */
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
  }

  /**
   * Updates the `Rect` to equal the given `Rect`
   * @param other the `Rect` to copy
   *
   * @beta
   */
  public from(other: Rect) {
    this.x = other.x;
    this.y = other.y;
    this._width = other._width;
    this._height = other._height;
  }

  /**
   * The x position of the right side of the `Rect`
   */
  public get right(): number {
    return this.x + this.width / 2;
  }
  public set right(value: number) {
    this.x = value - (this.right - this.x);
  }

  /**
   * The x position of the left side of the `Rect`
   */
  public get left(): number {
    return this.x - this.width / 2;
  }
  public set left(value: number) {
    this.x = value - (this.left - this.x);
  }

  /**
   * The y position of the top side of the `Rect`
   */
  public get top(): number {
    return this.y - this._height / 2;
  }
  public set top(value: number) {
    this.y = value - (this.top - this.y);
  }

  /**
   * The y position of the bottom side of the `Rect`
   */
  public get bottom(): number {
    return this.y + this._height / 2;
  }
  public set bottom(value: number) {
    this.y = value - (this.bottom - this.y);
  }

  /**
   * The center of the `Rect`
   */
  public get center(): PointArray {
    return [this.x, this.y];
  }
  public set center(value: PointArray) {
    this.x = value[0];
    this.y = value[1];
  }

  /**
   * The width of the `Rect`
   */
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }

  /**
   * The height of the `Rect`
   */
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  /**
   * The position of the `Rect` (equivalent to `center`)
   */
  public get position(): PointArray {
    return [this.x, this.y];
  }
  public set position(value: PointArray) {
    this.x = value[0];
    this.y = value[1];
  }

  /**
   * Checks if an x coordinate crosses the `Rect`
   * @param x the x coordinate to check
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideX(x: number): boolean {
    return this.left <= x && this.right >= x;
  }

  /**
   * Checks if a y coordinate crosses the `Rect`
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
   * Checks if an x, y coordinate touches the `Rect`
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
   * Checks if a {@link PointArray | `PointArray`} touches the `Rect`
   *
   * @param point the point to check
   * @returns `true` or `false`
   *
   * @beta
   */
  public collidePointArray(point: PointArray): boolean {
    return this.collideXY(point[0], point[1]);
  }

  /**
   * Checks if two `Rect`s collide
   *
   * @param rect another `Rect`
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideRect(rect: Rect) {
    return (
      rect.left < this.right &&
      rect.right > this.left &&
      rect.top < this.bottom &&
      rect.bottom > this.top
    );
  }

  /**
   *
   * @param rect another `Rect`
   * @param moveVector the movement Vector
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
   * Align the `Rect` to a specific face of another `Rect`
   * @param other the other `Rect`
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
   * Align the `Rect` to another `Rect`
   * @param other the other `Rect`
   * @param direction the direction to move the `Rect`
   *
   * @alpha
   */
  public alignTo(other: Rect, direction: [number, number]) {
    if (direction[0] > 0) {
      this.right = other.left;
    } else if (direction[0] < 0) {
      this.left = other.right;
    }
    if (direction[1] > 0) {
      this.bottom = other.top;
    } else if (direction[1] < 0) {
      this.top = other.bottom;
    }
  }

  /**
   * Resizes the `Rect` leaving its center in the same place
   *
   * @param size the new size for the `Rect`
   *
   * @beta
   */
  public resizeAndRecenter(size: PointArray) {
    const center: PointArray = [this.x, this.y];
    this.width = size[0];
    this.height = size[1];
    this.center = center;
  }

  /**
   * Move the `Rect` to a new position
   *
   * @param position
   */
  public teleportTo(position: PointArray) {
    this.center = position;
  }
}
