import { Point } from './Point.class';

/**
 * A class for a `Vector`
 *
 * @beta
 */
export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Constructs a new {@link Vector} from a given {@link Vector}
   *
   * @param other {@link Vector} to copy
   * @returns the new {@link Vector}
   *
   * @beta
   */
  public static from(other: Vector): Vector {
    return new Vector(other.x, other.y);
  }

  /**
   * Updates the {@link Vector} to equal the given {@link Vector}
   * @param other the {@link Vector} to copy
   *
   * @beta
   */
  public from(other: Vector) {
    this.x = other.x;
    this.y = other.y;
  }
  /**
   * Alias for {@link Vector#from}
   */
  public copy(): Vector {
    return Vector.from(this);
  }

  /**
   * The magnitude of the {@link Vector}
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
   * The direction of the {@link Vector} in radians, between -PI and PI
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
   * Rotates the {@link Vector} by a given angle
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

  public dotProduct(other: Vector | Point): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Returns the cross product of the {@link Vector} and another {@link Vector}
   * @param other the other {@link Vector}
   * @returns the cross product
   * @beta
   */
  public crossProduct(other: Vector | Point): number {
    return this.x * other.y - this.y * other.x;
  }

  /**
   * @returns the string representation of the Vector
   */
  public toString(): string {
    return `Vector<${this.x}, ${this.y}>`;
  }

  /**
   * @param other the other {@link Vector}
   * @returns if the {@link Vector} is equal to another {@link Vector}
   */
  public equals(other: Vector): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
