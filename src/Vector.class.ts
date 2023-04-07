/**
 * A class for a `Vector`
 *
 * @alpha
 */
export class Vector {
  public x: number;
  public y: number;

  public static copy(other: Vector): Vector {
    return new Vector(other.x, other.y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * The magnitude of the `Vector`
   */
  public get magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  public set magnitude(value: number) {
    if (this.magnitude === 0) return;
    const ratio = value / this.magnitude;
    this.x = ratio * this.x;
    this.y = ratio * this.y;
  }

  /**
   * The direction of the `Vector` in radians
   */
  public get direction(): number {
    return Math.atan(this.y / this.x);
  }
}
