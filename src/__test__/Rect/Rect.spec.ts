import { test, describe, expect } from 'vitest';

import { Rect } from '../../Rect.class';
import { Point } from '../../Point.class';

test('creates', () => {
  const rect = new Rect(5, 10, 15, 20);
  expect(rect).toBeDefined();
  expect(rect.x).toBe(5);
  expect(rect.y).toBe(10);
  expect(rect.width).toBe(15);
  expect(rect.height).toBe(20);
  expect(rect.left).toBe(5 - 15 / 2);
  expect(rect.top).toBe(0);
  expect(rect.right).toBe(12.5);
  expect(rect.bottom).toBe(20);
  expect(rect.center.array).toEqual([5, 10]);
});

describe('from', () => {
  test('moves and resizes', () => {
    const first = new Rect(2, 8, 10, 25);
    const second = new Rect(4, 5, 2, 2);
    expect(second.x).toBe(4);
    expect(second.y).toBe(5);
    expect(second.width).toBe(2);
    expect(second.height).toBe(2);
    second.from(first);
    expect(second.x).toBe(2);
    expect(second.y).toBe(8);
    expect(second.width).toBe(10);
    expect(second.height).toBe(25);
    second.x += 2;
    expect(second.x).toBe(4);
    expect(first.x).toBe(2);
  });
});

describe('collidePoint', () => {
  test('detects collision', () => {
    const rect = new Rect(1, 2, 1, 1);
    const pointA = new Point(0, 0);
    const pointB = new Point(1.3, 1.8);
    expect(rect.collidePoint(pointA)).toBe(false);
    expect(rect.collidePoint(pointB)).toBe(true);
  });
});

describe('moves', () => {
  test('by x', () => {
    const rect = new Rect(5, 10, 15, 20);
    rect.x += 5;
    expect(rect.x).toBe(10);
    expect(rect.y).toBe(10);
    expect(rect.width).toBe(15);
    expect(rect.height).toBe(20);
  });
  test('by y', () => {
    const rect = new Rect(5, 10, 15, 20);
    rect.y += 7;
    expect(rect.x).toBe(5);
    expect(rect.y).toBe(17);
    expect(rect.width).toBe(15);
    expect(rect.height).toBe(20);
  });
  test('by bottom', () => {
    const rect = new Rect(5, 10, 15, 20);
    rect.bottom = 2;
    expect(rect.x).toBe(5);
    expect(rect.y).toBe(-8);
    expect(rect.width).toBe(15);
    expect(rect.height).toBe(20);
  });
  test('by top', () => {
    const rect = new Rect(5, 10, 15, 20);
    rect.top = 1;
    expect(rect.x).toBe(5);
    expect(rect.y).toBe(11);
    expect(rect.width).toBe(15);
    expect(rect.height).toBe(20);
  });
  test('by left', () => {
    const rect = new Rect(5, 10, 10, 20);
    rect.left = 2;
    expect(rect.x).toBe(7);
  });
  test('by right', () => {
    const rect = new Rect(5, 10, 10, 20);
    rect.right = 11;
    expect(rect.x).toBe(6);
    expect(rect.right).toBe(11);

    const rect2 = new Rect(10, 15, 2, 4);
    rect2.right = 9;
    expect(rect2.right).toBe(9);
  });
});

test('grows', () => {
  const rect = new Rect(5, 10, 15, 20);
  rect.width += 5;
  expect(rect.x).toBe(5);
  expect(rect.y).toBe(10);
  expect(rect.width).toBe(20);
  expect(rect.height).toBe(20);
  rect.height += 7;
  expect(rect.x).toBe(5);
  expect(rect.y).toBe(10);
  expect(rect.width).toBe(20);
  expect(rect.height).toBe(27);
});

describe('collisions', () => {
  test('rect', () => {
    const rect = new Rect(10, 15, 2, 4);
    const rect2 = new Rect(10, 15, 2, 4);
    expect(rect.collideRect(rect2)).toBe(true);
    rect2.right = rect.left;
    expect(rect.collideRect(rect2)).toBe(false);
    rect2.right -= 0.1;
    expect(rect.collideRect(rect2)).toBe(false);
  });

  test('regression', () => {
    const rect = new Rect(26, 22, 2, 2);
    const rect2 = new Rect(6, 22, 0.1, 0.1);
    expect(rect.overlapRect(rect2)).toBe(0);
    expect(rect2.overlapRect(rect)).toBe(0);
    expect(rect.collideRect(rect2)).toBe(false);
    expect(rect2.collideRect(rect)).toBe(false);
  });
});

describe('RectPA', () => {
  describe('Copy', () => {
    test('creates equal rect', () => {
      const rect = new Rect(10, 20, 30, 40);
      const other = Rect.from(rect);
      expect(other).toEqual(rect);
      expect(other).not.toBe(rect);
    });
  });
  test('resizeAndRecenter', () => {
    const rect = new Rect(10, 20, 30, 40);
    const center = [...rect.center.array];
    rect.resizeAndRecenter([20, 25]);
    expect(center).toEqual(rect.center.array);
  });
  test('resizeAndRecenter with negative size', () => {
    const rect = new Rect(10, 20, 30, 40);
    const center = [...rect.center.array];
    rect.resizeAndRecenter([-20, -25]);
    expect(center).toEqual(rect.center.array);
    expect(rect.width).toBe(20);
    expect(rect.height).toBe(25);
    expect(rect.x).toBe(10);
    expect(rect.y).toBe(20);
    expect(rect.left).toBe(0);
    expect(rect.top).toBe(7.5);
    expect(rect.right).toBe(20);
    expect(rect.bottom).toBe(32.5);
    expect(rect.center.array).toEqual([10, 20]);
  });
  test('resizeAndRecenter with a Point', () => {
    const rect = new Rect(10, 20, 30, 40);
    const center = [...rect.center.array];
    rect.resizeAndRecenter(new Point(20, 25));
    expect(center).toEqual(rect.center.array);
  });
  test('teleportTo', () => {
    const rect = new Rect(10, 20, 30, 40);
    rect.teleportTo([56, 57]);
    expect(rect.center.array).toEqual([56, 57]);
  });
});

describe('perimeter', () => {
  test('returns perimeter', () => {
    const rect = new Rect(10, 20, 30, 40);
    expect(rect.perimeter).toBe(140);
  });
});

describe('area', () => {
  test('returns area', () => {
    const rect = new Rect(10, 20, 30, 40);
    expect(rect.area).toBe(1200);
  });
});

describe('toString', () => {
  test('returns string', () => {
    const rect = new Rect(10, 20, 30, 40);
    expect(rect.toString()).toBe('Rect<10, 20, 30, 40, 0θ>');
  });

  test('returns string with angle', () => {
    const rect = new Rect(10, 20, 30, 40, 1);
    expect(rect.toString()).toBe('Rect<10, 20, 30, 40, 1θ>');
  });
});
