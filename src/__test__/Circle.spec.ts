import { test, describe, expect } from 'vitest';

import { Circle } from '../Circle.class';
import { Point } from '../Point.class';

describe('creates', () => {
  test('should have correct x, y, and radius', () => {
    const circ = new Circle([2, 7], 10);
    expect(circ).toBeDefined();
    expect(circ.x).toBe(2);
    expect(circ.y).toBe(7);
    expect(circ.radius).toBe(10);
    expect(circ.center).toEqual(Point.from([2, 7]));
  });
});

describe('center', () => {
  test('returns array', () => {
    const circ = new Circle([2, 7], 10);
    expect(circ.center).toEqual(Point.from([2, 7]));
  });

  test('can be set with an array', () => {
    const circ = new Circle([2, 7], 10);
    circ.center = [5, 8];
    expect(circ.center).toEqual(Point.from([5, 8]));
    expect(circ.x).toBe(5);
    expect(circ.y).toBe(8);
  });
});

describe('rotate', () => {
  test('rotates', () => {
    const circle = new Circle([1, 1], 5);
    expect(circle).toBeDefined();
    expect(circle.x).toBe(1);
    expect(circle.y).toBe(1);
    circle.rotate(Math.PI);
    expect(circle.x).toBeCloseTo(-1);
    expect(circle.y).toBeCloseTo(-1);
    circle.rotate(Math.PI / 2);
    expect(circle.x).toBeCloseTo(1);
    expect(circle.y).toBeCloseTo(-1);
    circle.rotate(Math.PI / 2);
    expect(circle.x).toBeCloseTo(1);
    expect(circle.y).toBeCloseTo(1);
    circle.rotate(Math.PI, new Point(0.5, 0.5));
    expect(circle.x).toBeCloseTo(0);
    expect(circle.y).toBeCloseTo(0);
  });
});
