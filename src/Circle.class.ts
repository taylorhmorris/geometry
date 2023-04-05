import { Rect } from './Rect.class';

export class Circle {
  public x: number;
  public y: number;
  private _radius: number;

  public static copy(other: Circle): Circle {
    return new Circle(other.x, other.y, other._radius);
  }

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this._radius = radius;
  }

  public get center(): [number, number] {
    return [this.x, this.y];
  }
  public set center([x, y]: [number, number]) {
    this.x = x;
    this.y = y;
  }
  public get radius(): number {
    return this._radius;
  }
  public set radius(radius: number) {
    this._radius = radius;
  }

  public collideX(x: number): boolean {
    if (Math.abs(x - this.x) <= this.radius) return true;
    return false;
  }
  public collideY(y: number): boolean {
    if (Math.abs(y - this.y) <= this.radius) return true;
    return false;
  }
  public collideXY(x: number, y: number): boolean {
    return this.collideX(x) && this.collideY(y);
  }
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
  public collideCircle(other: Circle): boolean {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distranceSq = dx ^ (2 + dy) ^ 2;
    return distranceSq < ((this.radius + other.radius) ^ 2);
  }
}
