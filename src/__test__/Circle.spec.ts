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
