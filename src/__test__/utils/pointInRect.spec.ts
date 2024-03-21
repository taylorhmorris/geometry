import { describe, expect, test } from 'vitest';

import { pointIntersectsRect } from '../../utils/pointIntersectsRect';
import { Point } from '../../Point.class';
import { newRect } from '../../utils/newRect';

describe('pointInRect', () => {
  test('should return true if point is inside rect', () => {
    const p = new Point(10, 10);
    const r = newRect(5, 5, 15, 15);
    expect(pointIntersectsRect(p, r)).toBe(true);
  });

  test('should return false if point is outside rect', () => {
    const p = new Point(10, 10);
    const r = newRect(20, 20, 30, 30);
    expect(pointIntersectsRect(p, r)).toBe(false);
  });

  test('should return true if point is on the edge of rect', () => {
    const p = new Point(10, 10);
    const r = newRect(10, 10, 20, 20);
    expect(pointIntersectsRect(p, r)).toBe(true);
  });

  test('should return true if point is inside rotated rect', () => {
    const p = new Point(1.5, 2.5);
    const r = newRect(1, 1, 3, 2);
    r.rotate(-Math.PI / 2);
    expect(pointIntersectsRect(p, r)).toBe(true);
  });
});
