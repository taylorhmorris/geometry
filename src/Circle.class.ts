import { Point } from './Point.class';
import { PointArray } from './PointArray.type';
import { Rect } from './Rect.class';

/**
 * A class for Circles
 *
 * @alpha
 */
export class Circle {
  private _center: Point;
  private _radius: number;

  /**
   * @deprecated Use {@link Circle.from} instead.
   */
  public static copy(other: Circle): Circle {
    return Circle.from(other);
  }
  /**
   * Constructs a new {@link Circle} from a given {@link Circle}
   *
   * @param other {@link Circle} to copy
   * @returns the new {@link Circle}
   *
   * @beta
   */
  public static from(other: Circle): Circle {
    return new Circle(other._center, other._radius);
  }

  /**
   * The constructor of the {@link Circle} class
   *
   * @param center the center Point of the {@link Circle}
   * @param radius the radius of the {@link Circle}
   */
  constructor(center: Point | PointArray, radius: number) {
    this._center = Point.from(center);
    this._radius = radius;
  }

  /**
   * Updates the {@link Circle} to equal the given {@link Circle}
   * @param other the {@link Circle} to copy
   *
   * @beta
   */
  public from(other: Circle) {
    this._center = other.center.copy();
    this._radius = other._radius;
  }
  /**
   * @returns a copy of the {@link Circle}
   */
  public copy(): Circle {
    return Circle.from(this);
  }

  /**
   * The x coordinate of the center of the {@link Circle}
   */
  public get x(): number {
    return this._center.x;
  }
  public set x(x: number) {
    this._center.x = x;
  }

  /**
   * The y coordinate of the center of the {@link Circle}
   */
  public get y(): number {
    return this._center.y;
  }
  public set y(y: number) {
    this._center.y = y;
  }

  /**
   * The center of the {@link Circle}
   */
  public get center(): Point {
    return this._center;
  }
  public set center(point: Point | PointArray) {
    this._center.from(point);
  }

  /**
   * The radius of the {@link Circle}
   */
  public get radius(): number {
    return this._radius;
  }
  public set radius(radius: number) {
    this._radius = radius;
  }

  /**
   * Checks if an x coordinate crosses the {@link Circle}
   * @param x an x coordinate
   * @returns `true` or `false`
   */
  public collideX(x: number): boolean {
    if (Math.abs(x - this.x) <= this.radius) return true;
    return false;
  }

  /**
   * Checks if an y coordinate crosses the {@link Circle}
   * @param y an y coordinate
   * @returns `true` or `false`
   */
  public collideY(y: number): boolean {
    if (Math.abs(y - this.y) <= this.radius) return true;
    return false;
  }

  /**
   * Checks if an x, y coordinate touches the {@link Circle}
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
   * Checks if the {@link Circle} collides with a given rotated {@link Rect}
   *
   * @param rect a {@link Rect}
   * @returns `true` or `false`
   *
   * @beta
   */
  private collideRotatedRect(rect: Rect): boolean {
    const undoRotation = -rect.angle;
    const newRect = rect.copy();
    newRect.rotate(undoRotation, [0, 0]);
    const newCircle = this.copy();
    newCircle.rotate(undoRotation, new Point(0, 0));
    return newCircle.collideUnrotatedRect(newRect);
  }

  /**
   * Checks if the {@link Circle} collides with a given unrotated {@link Rect}
   *
   * @param rect a {@link Rect}
   * @returns `true` or `false`
   *
   * @beta
   */
  private collideUnrotatedRect(rect: Rect): boolean {
    const circleDistanceX = Math.abs(this.x - rect.x);
    const circleDistanceY = Math.abs(this.y - rect.y);
    if (circleDistanceX > rect.width / 2 + this.radius) return false;
    if (circleDistanceY > rect.height / 2 + this.radius) return false;
    if (circleDistanceX <= rect.width / 2) return true;
    if (circleDistanceY <= rect.height / 2) return true;
    const cornerDistanceSq =
      (circleDistanceX - rect.width / 2) ^
      (2 + (circleDistanceY - rect.height / 2)) ^
      2;
    return cornerDistanceSq <= (this._radius ^ 2);
  }

  /**
   * Checks if the {@link Circle} collides with a given {@link Rect}
   *
   * @param rect a {@link Rect}
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideRect(rect: Rect): boolean {
    if (rect.angle) return this.collideRotatedRect(rect);
    return this.collideUnrotatedRect(rect);
  }

  /**
   * Checks if two {@link Circle}s collide
   * @param other another {@link Circle}
   * @returns if the {@link Circle}s collide
   *
   * @alpha
   */
  public collideCircle(other: Circle): boolean {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distranceSq = dx ** 2 + dy ** 2;
    return distranceSq < (this.radius + other.radius) ** 2;
  }

  /**
   * Rotates the circle by theta around a given origin
   *
   * @param theta the amount in radians to rotate
   * @param origin the origin to rotate around (default: (0, 0))
   *
   * @alpha
   */
  public rotate(theta: number, origin: Point = new Point(0, 0)) {
    this.center.rotate(theta, origin);
  }
}
