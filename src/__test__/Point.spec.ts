import { test, describe, expect } from 'vitest';
import { Point } from '../Point.class';

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
});
