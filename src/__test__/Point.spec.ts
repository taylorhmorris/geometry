import { test, describe, expect } from 'vitest';
import { Point } from '../Point.class';
import { PointArray } from '../PointArray.type';

describe('Point', () => {
  test('creates', () => {
    const point = new Point(1, 5);
    expect(point).toBeDefined();
    expect(point.x).toBe(1);
    expect(point.y).toBe(5);
  });

  test('rotates', () => {
    const point = new Point(1, 1);
    expect(point).toBeDefined();
    expect(point.x).toBe(1);
    expect(point.y).toBe(1);
    point.rotate(Math.PI);
    expect(point.x).toBeCloseTo(-1);
    expect(point.y).toBeCloseTo(-1);
    point.rotate(Math.PI / 2);
    expect(point.x).toBeCloseTo(1);
    expect(point.y).toBeCloseTo(-1);
    point.rotate(Math.PI / 2);
    expect(point.x).toBeCloseTo(1);
    expect(point.y).toBeCloseTo(1);
    point.rotate(Math.PI, new Point(0.5, 0.5));
    expect(point.x).toBeCloseTo(0);
    expect(point.y).toBeCloseTo(0);

    const newPoint = new Point(0.6, 0.6);
    newPoint.rotate(-Math.PI / 4);
    expect(newPoint.x).toBeCloseTo(0.848);
    expect(newPoint.y).toBeCloseTo(0);
  });

  test('can return a PointArray', () => {
    const point = new Point(2, 7);
    const pointArray1 = point.array;
    expect(pointArray1).toEqual([2, 7]);
  });

  test('can be set by a PointArray', () => {
    const point = new Point(2, 7);
    const pointArray1: PointArray = [4, 3];
    point.array = pointArray1;
    expect(point.x).toEqual(4);
    expect(point.y).toEqual(3);
  });

  test('changes to returned PointArray should not affect Point', () => {
    const point = new Point(2, 7);
    const pointArray1 = point.array;
    expect(pointArray1).toEqual([2, 7]);
    pointArray1[0] = 5;
    expect(point.x).toEqual(2);
    expect(point.y).toEqual(7);
    const pointArray2 = point.array;
    expect(pointArray2).toEqual([2, 7]);
  });
});

describe('Point.rotate', () => {
  test('should rotate a point around the origin', () => {
    const p = new Point(1, 0);
    const a = Point.rotate(p, Math.PI / 2);
    expect(p.x).toBe(1);
    expect(p.y).toBe(0);
    expect(a.x).toBeCloseTo(0);
    expect(a.y).toBeCloseTo(1);
  });

  test('should rotate a point around a given origin', () => {
    const p = new Point(1, 0);
    const origin = new Point(1, 1);
    const a = Point.rotate(p, Math.PI / 2, origin);
    expect(p.x).toBe(1);
    expect(p.y).toBe(0);
    expect(a.x).toBeCloseTo(2);
    expect(a.y).toBeCloseTo(1);
  });
});

describe('point.collidePoint', () => {
  test('should return true if two points are equal', () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(1, 2);
    expect(p1.collidePoint(p2)).toBe(true);
  });

  test('should return false if two points are not equal', () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(3, 4);
    expect(p1.collidePoint(p2)).toBe(false);
  });

  test('should return true if point collides with point array', () => {
    const p = new Point(1, 2);
    const pa: PointArray = [1, 2];
    expect(p.collidePoint(pa)).toBe(true);
  });
  test('should return false if point does not collide with point array', () => {
    const p = new Point(1, 2);
    const pa: PointArray = [3, 4];
    expect(p.collidePoint(pa)).toBe(false);
  });
});

describe('point.toString', () => {
  test('should return a string representation of the point', () => {
    const p = new Point(1, 2);
    expect(p.toString()).toBe('Point<1, 2>');
  });
});

describe('point.distanceTo', () => {
  test('should return the distance to another point on the y-axis', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(0, 5);
    expect(p1.distanceTo(p2)).toBeCloseTo(5);
    expect(p2.distanceTo(p1)).toBeCloseTo(5);
  });
  test('should return the distance to another point on the x-axis', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(-7, 0);
    expect(p1.distanceTo(p2)).toBeCloseTo(7);
    expect(p2.distanceTo(p1)).toBeCloseTo(7);
  });
  test('should return the distance to another point on the diagonal', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(3, 4);
    expect(p1.distanceTo(p2)).toBeCloseTo(5);
    expect(p2.distanceTo(p1)).toBeCloseTo(5);
  });
  test('should return the distance to another point on the diagonal with negative coordinates', () => {
    const p1 = new Point(-3, -4);
    const p2 = new Point(0, 0);
    expect(p1.distanceTo(p2)).toBeCloseTo(5);
    expect(p2.distanceTo(p1)).toBeCloseTo(5);
  });
  test('should return 0 if points are equal', () => {
    const p1 = new Point(0, 0);
    const p2 = new Point(0, 0);
    expect(p1.distanceTo(p2)).toBeCloseTo(0);
    expect(p2.distanceTo(p1)).toBeCloseTo(0);
  });
});
