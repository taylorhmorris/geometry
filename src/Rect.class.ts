import { Face } from './Face.enum';
import { PointArray } from './PointArray.type';
import { Vector } from './Vector.class';

export class Rect {
  x: number;
  y: number;
  private _width: number;
  private _height: number;

  public static copy(other: Rect): Rect {
    return new Rect(other.x, other.y, other._width, other._height);
  }

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
  }

  public from(other: Rect) {
    this.x = other.x;
    this.y = other.y;
    this._width = other._width;
    this._height = other._height;
  }

  public get right() {
    return this.x + this.width / 2;
  }
  public set right(value: number) {
    this.x = value - (this.right - this.x);
  }
  public get left() {
    return this.x - this.width / 2;
  }
  public set left(value: number) {
    this.x = value - (this.left - this.x);
  }
  public get top() {
    return this.y - this._height / 2;
  }
  public set top(value: number) {
    this.y = value - (this.top - this.y);
  }
  public get bottom() {
    return this.y + this._height / 2;
  }
  public set bottom(value: number) {
    this.y = value - (this.bottom - this.y);
  }
  public get center(): PointArray {
    return [this.x, this.y];
  }
  public set center(value: PointArray) {
    this.x = value[0];
    this.y = value[1];
  }

  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  public get position(): PointArray {
    return [this.x, this.y];
  }
  public set position(value: PointArray) {
    this.x = value[0];
    this.y = value[1];
  }

  public collideX(x: number): boolean {
    return this.left <= x && this.right >= x;
  }
  public collideY(y: number): boolean {
    return this.top <= y && this.bottom >= y;
  }
  public collideXY(x: number, y: number): boolean {
    return this.collideX(x) && this.collideY(y);
  }
  public collidePoint(point: PointArray): boolean {
    return this.collideXY(point[0], point[1]);
  }

  public collideRect(rect: Rect) {
    return (
      rect.left < this.right &&
      rect.right > this.left &&
      rect.top < this.bottom &&
      rect.bottom > this.top
    );
  }

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

  public alignTo(other: Rect, direction: [number, number]) {
    if (direction[0] > 0) {
      this.right = other.left;
    } else if (direction[0] < 0) {
      this.left = other.right;
    } else if (direction[1] > 0) {
      this.bottom = other.top;
    } else if (direction[1] < 0) {
      this.top = other.bottom;
    }
  }

  public resizeAndRecenter(size: PointArray) {
    const center: PointArray = [this.x, this.y];
    this.width = size[0];
    this.height = size[1];
    this.center = center;
  }
  public teleportTo(position: PointArray) {
    this.center = position;
  }
}
