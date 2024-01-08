import { test, describe, expect } from 'vitest';

import { Circle } from '../Circle.class';
import { Point } from '../Point.class';
import { Rect } from '../Rect.class';

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

  test('rotates', () => {
    const circ = new Circle([1.5, 1.5], 0.05);
    circ.rotate(-Math.PI / 4);
    expect(circ.x).toBeCloseTo(2.12);
    expect(circ.y).toBeCloseTo(0);
  });

  describe('collideCircle', () => {
    test('collides with overlapping circles', () => {
      const circle1 = new Circle([1, 1], 10);
      const circle2 = new Circle([1, 1], 10);
      expect(circle1.collideCircle(circle2)).toBe(true);
    });

    test('collides with partially overlapping circles', () => {
      const circle1 = new Circle([1, 1], 10);
      const circle2 = new Circle([2, 2], 10);
      expect(circle1.collideCircle(circle2)).toBe(true);
    });

    test('does not collide with non-overlapping circles', () => {
      const circle1 = new Circle([1, 1], 1);
      const circle2 = new Circle([5, 5], 1);
      expect(circle1.collideCircle(circle2)).toBe(false);
    });

    test('does not collide with non-overlapping circles with overlapping x', () => {
      const circle1 = new Circle([1, 1], 1);
      const circle2 = new Circle([1, 50], 1);
      expect(circle1.collideCircle(circle2)).toBe(false);
    });
  });
});

describe('collideRect', () => {
  test('circle in rect should return true', () => {
    const circ = new Circle([5, 5], 0.5);
    const rect = new Rect(5, 5, 2, 2, 0);
    expect(circ.collideRect(rect)).toBe(true);
  });
  test('rect in circle should return true', () => {
    const circ = new Circle([5, 5], 10);
    const rect = new Rect(5, 5, 2, 2, 0);
    expect(circ.collideRect(rect)).toBe(true);
  });
  test('rect away from circle should return false', () => {
    const circ = new Circle([50, 50], 10);
    const rect = new Rect(5, 5, 2, 2, 0);
    expect(circ.collideRect(rect)).toBe(false);
  });
  test('rect overlap circle should return true', () => {
    const circ = new Circle([5, 5], 5);
    const rect = new Rect(-2, 5, 4, 2, 0);
    expect(circ.collideRect(rect)).toBe(true);
  });
  test('circle overlap rect corner should return true', () => {
    const circ = new Circle([8, 8], 1);
    const rect = new Rect(5, 5, 4, 4, 0);
    expect(circ.collideRect(rect)).toBe(true);
  });
  test('circle overlap rect corner should return false if rotated out', () => {
    const circ = new Circle([1.5, 1.5], 0.1);
    const rect = new Rect(0, 0, 4, 4, Math.PI / 4);
    expect(circ.collideRect(rect)).toBe(false);
  });
  test('circle overlap rect corner should return true', () => {
    const circ = new Circle([1.5, 1.5], 0.1);
    const rect = new Rect(0, 0, 4, 4, 0);
    expect(circ.collideRect(rect)).toBe(true);
  });
  test('circle overlap rect outside origin corner should return false if rotated out', () => {
    const circ = new Circle([6.5, 6.5], 0.1);
    const rect = new Rect(5, 5, 4, 4, Math.PI / 4);
    expect(circ.collideRect(rect)).toBe(false);
  });
  test('circle overlap rect outside origin corner should return true', () => {
    const circ = new Circle([6.5, 6.5], 0.1);
    const rect = new Rect(5, 5, 4, 4, 0);
    expect(circ.collideRect(rect)).toBe(true);
  });
});

describe('circumference', () => {
  test('returns correct circumference', () => {
    const circ = new Circle([0, 0], 1);
    expect(circ.circumference).toBeCloseTo(2 * Math.PI);
  });

  test('returns correct circumference', () => {
    const circ = new Circle([0, 0], 7);
    expect(circ.circumference).toBeCloseTo(2 * Math.PI * 7);
  });
});

describe('area', () => {
  test('returns correct area', () => {
    const circ = new Circle([0, 0], 1);
    expect(circ.area).toBeCloseTo(Math.PI);
  });

  test('returns correct are', () => {
    const circ = new Circle([0, 0], 7);
    expect(circ.area).toBeCloseTo(Math.PI * 49);
  });
});
