import { Rect } from './index';
import { Point } from './Point.class';

/**
 * Polygon class
 * Represents a polygon with a list of points.
 *
 * @alpha
 */
export class Polygon {
  private _points: Point[];

  /**
   * Constructs a new {@link Polygon} from a given {@link Polygon}
   *
   * @param other {@link Polygon} to copy
   * @returns the new {@link Polygon}
   *
   * @alpha
   */
  public static from(other: Polygon): Polygon {
    return new Polygon(other._points.map((point) => point.copy()));
  }

  /**
   * The constructor of the {@link Polygon} class
   *
   * @param points the points of the {@link Polygon}
   */
  constructor(points: Point[]) {
    this._points = points.map((point) => Point.from(point));
  }

  /**
   * Updates the {@link Polygon} to equal the given {@link Polygon}
   * @param other the {@link Polygon} to copy
   *
   * @alpha
   */
  public from(other: Polygon) {
    this._points = other._points.map((point) => point.copy());
  }

  /**
   * @returns a copy of the {@link Polygon}
   */
  public copy(): Polygon {
    return Polygon.from(this);
  }

  /**
   * The points of the {@link Polygon}
   */
  public get points(): readonly Point[] {
    return this._points;
  }

  /**
   * Sets the points of the {@link Polygon}
   * @param points the new points of the {@link Polygon}
   */
  public set points(points: Point[]) {
    this._points = points.map((point) => Point.from(point));
  }

  /**
   * @returns the number of points in the {@link Polygon}
   */
  public get length(): number {
    return this._points.length;
  }

  /**
   * @returns the area of the {@link Polygon}
   */
  public get area(): number {
    let area = 0;
    for (let i = 0; i < this._points.length; i++) {
      const p1 = this._points[i];
      const p2 = this._points[(i + 1) % this._points.length];
      area += p1.x * p2.y - p2.x * p1.y;
    }
    return Math.abs(area) / 2;
  }

  /**
   * @returns the perimeter of the {@link Polygon}
   */
  public get perimeter(): number {
    let perimeter = 0;
    for (let i = 0; i < this._points.length; i++) {
      const p1 = this._points[i];
      const p2 = this._points[(i + 1) % this._points.length];
      perimeter += p1.distanceTo(p2);
    }
    return perimeter;
  }

  /**
   * @returns the centroid of the {@link Polygon}
   */
  public get centroid(): Point {
    const area = this.area;
    if (area === 0) {
      return new Point(0, 0);
    }

    let cx = 0;
    let cy = 0;

    for (let i = 0; i < this._points.length; i++) {
      const p1 = this._points[i];
      const p2 = this._points[(i + 1) % this._points.length];
      const crossProduct = p1.x * p2.y - p2.x * p1.y;
      cx += (p1.x + p2.x) * crossProduct;
      cy += (p1.y + p2.y) * crossProduct;
    }

    return new Point(cx / (6 * area), cy / (6 * area));
  }

  /**
   * Checks if a {@link Point} collides with the {@link Polygon}
   * @param point the {@link Point} to check
   * @returns `true` if the point collides with the {@link Polygon}, `false` otherwise
   */
  public collidePoint(point: Point): boolean {
    if (!point) return false;
    throw new Error('Not implemented');
  }

  /**
   * Checks if a {@link Rect} collides with the {@link Polygon}
   * @param rect the {@link Rect} to check
   * @returns `true` if the {@link Rect} collides with the {@link Polygon}, `false` otherwise
   */
  public collideRect(rect: Rect): boolean {
    if (!rect) return false;
    throw new Error('Not implemented');
  }

  /**
   * Checks if a {@link Polygon} collides with the {@link Polygon}
   * @param polygon the {@link Polygon} to check
   * @returns `true` if the {@link Polygon} collides with the {@link Polygon}, `false` otherwise
   */
  public collidePolygon(polygon: Polygon): boolean {
    if (!polygon) return false;
    throw new Error('Not implemented');
  }

  /**
   * Checks if a {@link Circle} collides with the {@link Polygon}
   * @param circle the {@link Circle} to check
   * @returns `true` if the {@link Circle} collides with the {@link Polygon}, `false` otherwise
   */
  public collideCircle(circle: Polygon): boolean {
    if (!circle) return false;
    throw new Error('Not implemented');
  }

  /**
   * Checks if another Shape collides with the {@link Polygon}
   * @param shape the Shape to check
   * @returns `true` if the Shape collides with the {@link Polygon}, `false` otherwise
   */
  public collide(shape: Polygon): boolean {
    if (!shape) return false;
    throw new Error('Not implemented');
  }

  /**
   * Rotates the {@link Polygon} by a given angle around a given origin
   * @param theta the amount in radians to rotate
   * @param origin the origin to rotate around (default: (0, 0))
   * @alpha
   */
  public rotate(theta: number, origin: Point = new Point(0, 0)) {
    this._points.forEach((point) => point.rotate(theta, origin));
  }

  /**
   * @returns string representation of the {@link Polygon}
   * @alpha
   */
  public toString(): string {
    return `Polygon<${this._points.map((point) => point.toString()).join(', ')}>`;
  }
}
