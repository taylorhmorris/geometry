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
