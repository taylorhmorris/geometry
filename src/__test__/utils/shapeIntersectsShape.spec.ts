import { describe, expect, test } from 'vitest';
import { shapeIntersectsShape } from '../../utils/shapeIntersectsShape';

import { Circle } from '../../Circle.class';
import { Point } from '../../Point.class';
import { newRect } from '../../utils/newRect';
import type { PointArray } from '../../PointArray.type';

describe('shapeIntersectsShape', () => {
  test('should return true if two rects intersect', () => {
    const r1 = newRect(0, 0, 10, 10);
    const r2 = newRect(5, 5, 15, 15);
    expect(shapeIntersectsShape(r1, r2)).toBe(true);
  });
  test('should return false if two rects do not intersect', () => {
    const r1 = newRect(0, 0, 10, 10);
    const r2 = newRect(15, 15, 25, 25);
    expect(shapeIntersectsShape(r1, r2)).toBe(false);
  });

  test('should return true if circle intersects rect', () => {
    const c = new Circle([5, 5], 5);
    const r = newRect(0, 0, 10, 10);
    expect(shapeIntersectsShape(c, r)).toBe(true);
  });
  test('should return false if circle does not intersect rect', () => {
    const c = new Circle([20, 20], 5);
    const r = newRect(0, 0, 10, 10);
    expect(shapeIntersectsShape(c, r)).toBe(false);
  });

  test('should return true if point intersects rect', () => {
    const p = new Point(5, 5);
    const r = newRect(0, 0, 10, 10);
    expect(shapeIntersectsShape(p, r)).toBe(true);
  });
  test('should return false if point does not intersect rect', () => {
    const p = new Point(15, 15);
    const r = newRect(0, 0, 10, 10);
    expect(shapeIntersectsShape(p, r)).toBe(false);
  });

  test('should return true if point array intersects rect', () => {
    const pa: PointArray = [5, 5];
    const r = newRect(0, 0, 10, 10);
    expect(shapeIntersectsShape(pa, r)).toBe(true);
  });
  test('should return false if point array does not intersect rect', () => {
    const pa: PointArray = [15, 15];
    const r = newRect(0, 0, 10, 10);
    expect(shapeIntersectsShape(pa, r)).toBe(false);
  });

  test('should return true if two circles intersect', () => {
    const c1 = new Circle([5, 5], 5);
    const c2 = new Circle([8, 8], 5);
    expect(shapeIntersectsShape(c1, c2)).toBe(true);
  });
  test('should return false if two circles do not intersect', () => {
    const c1 = new Circle([5, 5], 5);
    const c2 = new Circle([20, 20], 5);
    expect(shapeIntersectsShape(c1, c2)).toBe(false);
  });

  test('should return true if circle intersects point', () => {
    const c = new Circle([5, 5], 5);
    const p = new Point(8, 8);
    expect(shapeIntersectsShape(c, p)).toBe(true);
  });
  test('should return false if circle does not intersect point', () => {
    const c = new Circle([5, 5], 5);
    const p = new Point(20, 20);
    expect(shapeIntersectsShape(c, p)).toBe(false);
  });

  test('should return true if circle intersects point array', () => {
    const c = new Circle([5, 5], 5);
    const pa: PointArray = [8, 8];
    expect(shapeIntersectsShape(c, pa)).toBe(true);
  });
  test('should return false if circle does not intersect point array', () => {
    const c = new Circle([5, 5], 5);
    const pa: PointArray = [20, 20];
    expect(shapeIntersectsShape(c, pa)).toBe(false);
  });

  test('should return true if point intersects circle', () => {
    const p = new Point(8, 8);
    const c = new Circle([5, 5], 5);
    expect(shapeIntersectsShape(p, c)).toBe(true);
  });
  test('should return false if point does not intersect circle', () => {
    const p = new Point(20, 20);
    const c = new Circle([5, 5], 5);
    expect(shapeIntersectsShape(p, c)).toBe(false);
  });

  test('should return true if point array intersects circle', () => {
    const pa: PointArray = [8, 8];
    const c = new Circle([5, 5], 5);
    expect(shapeIntersectsShape(pa, c)).toBe(true);
  });
  test('should return false if point array does not intersect circle', () => {
    const pa: PointArray = [20, 20];
    const c = new Circle([5, 5], 5);
    expect(shapeIntersectsShape(pa, c)).toBe(false);
  });

  test('should return true if point array intersects point', () => {
    const pa: PointArray = [5, 5];
    const p = new Point(5, 5);
    expect(shapeIntersectsShape(pa, p)).toBe(true);
  });
  test('should return false if point array does not intersect point', () => {
    const pa: PointArray = [15, 15];
    const p = new Point(5, 5);
    expect(shapeIntersectsShape(pa, p)).toBe(false);
  });
  test('should return true if two point arrays intersect', () => {
    const pa1: PointArray = [5, 5];
    const pa2: PointArray = [5, 5];
    expect(shapeIntersectsShape(pa1, pa2)).toBe(true);
  });
  test('should return false if two point arrays do not intersect', () => {
    const pa1: PointArray = [5, 5];
    const pa2: PointArray = [15, 15];
    expect(shapeIntersectsShape(pa1, pa2)).toBe(false);
  });

  test('should return true if point intersects point array', () => {
    const p = new Point(5, 5);
    const pa: PointArray = [5, 5];
    expect(shapeIntersectsShape(p, pa)).toBe(true);
  });
  test('should return false if point does not intersect point array', () => {
    const p = new Point(5, 5);
    const pa: PointArray = [15, 15];
    expect(shapeIntersectsShape(p, pa)).toBe(false);
  });

  test('should return true if rect intersects point array', () => {
    const r = newRect(0, 0, 10, 10);
    const pa: PointArray = [5, 5];
    expect(shapeIntersectsShape(r, pa)).toBe(true);
  });
  test('should return false if rect does not intersect point array', () => {
    const r = newRect(0, 0, 10, 10);
    const pa: PointArray = [15, 15];
    expect(shapeIntersectsShape(r, pa)).toBe(false);
  });

  test('should return true if rect intersects point', () => {
    const r = newRect(0, 0, 10, 10);
    const p = new Point(5, 5);
    expect(shapeIntersectsShape(r, p)).toBe(true);
  });
  test('should return false if rect does not intersect point', () => {
    const r = newRect(0, 0, 10, 10);
    const p = new Point(15, 15);
    expect(shapeIntersectsShape(r, p)).toBe(false);
  });

  test('should return true if rect intersects circle', () => {
    const r = newRect(0, 0, 10, 10);
    const c = new Circle([5, 5], 5);
    expect(shapeIntersectsShape(r, c)).toBe(true);
  });
  test('should return false if rect does not intersect circle', () => {
    const r = newRect(0, 0, 10, 10);
    const c = new Circle([20, 20], 5);
    expect(shapeIntersectsShape(r, c)).toBe(false);
  });
});
