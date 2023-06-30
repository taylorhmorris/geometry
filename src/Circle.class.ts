import { Rect } from './Rect.class';

/**
 * A class for Circles
 *
 * @alpha
 */
export class Circle {
  public x: number;
  public y: number;
  private _radius: number;

  /**
   * @deprecated Use {@link Circle.from} instead.
   */
  public static copy(other: Circle): Circle {
    return new Circle(other.x, other.y, other._radius);
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
    return new Circle(other.x, other.y, other._radius);
  }

  /**
   * The constructor of the {@link Circle} class
   *
   * @param x the x position of the {@link Circle}
   * @param y the y position of the {@link Circle}
   * @param radius the radius of the {@link Circle}
   */
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this._radius = radius;
  }

  /**
   * Updates the {@link Circle} to equal the given {@link Circle}
   * @param other the {@link Circle} to copy
   *
   * @beta
   */
  public from(other: Circle) {
    this.x = other.x;
    this.y = other.y;
    this._radius = other._radius;
  }
  /**
   * @returns a copy of the {@link Circle}
   */
  public copy(): Circle {
    return Circle.from(this);
  }

  /**
   * The center of the {@link Circle}
   */
  public get center(): [number, number] {
    return [this.x, this.y];
  }
  public set center([x, y]: [number, number]) {
    this.x = x;
    this.y = y;
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
   * Checks if the {@link Circle} collides with a given {@link Rect}
   *
   * @param rect a {@link Rect}
   * @returns `true` or `false`
   *
   * @beta
   */
  public collideRect(rect: Rect): boolean {
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
   * Checks if two {@link Circle}s collide
   * @param other another {@link Circle}
   * @returns
   */
  public collideCircle(other: Circle): boolean {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distranceSq = dx ^ (2 + dy) ^ 2;
    return distranceSq < ((this.radius + other.radius) ^ 2);
  }
}
