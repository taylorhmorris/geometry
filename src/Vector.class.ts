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
   * The direction of the `Vector` in radians, between -PI and PI
   */
  public get direction(): number {
    return Math.atan2(this.y, this.x);
  }
  public set direction(angle: number) {
    const magnitude = this.magnitude;
    while (angle < 0 || angle > 2 * Math.PI) {
      angle = (angle + 2 * Math.PI) % (2 * Math.PI);
    }
    this.x = magnitude * Math.cos(angle);
    this.y = magnitude * Math.sin(angle);
  }

  /**
   * Rotates the vector by a given angle
   * @param deltaAngle the desired change in the angle (in radians)
   */
  public rotate(deltaAngle: number) {
    const cos = Math.cos(deltaAngle);
    const sin = Math.sin(deltaAngle);
    const newX = cos * this.x - sin * this.y;
    const newY = sin * this.x + cos * this.y;
    this.x = newX;
    this.y = newY;
  }
}
