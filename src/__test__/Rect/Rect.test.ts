import { test, describe, expect, beforeEach } from 'vitest';

import { Rect } from '../../Rect.class';

describe('Rect', () => {
  let rect: Rect;

  beforeEach(() => {
    rect = new Rect(0, 0, 10, 20, Math.PI / 2);
  });

  test('constructor', () => {
    expect(rect.x).toBe(0);
    expect(rect.y).toBe(0);
    expect(rect.width).toBe(10);
    expect(rect.height).toBe(20);
    expect(rect.angle).toBe(Math.PI / 2);
  });

  test('from', () => {
    const from = Rect.from(rect);
    expect(from).not.toBe(rect);
    expect(from).toEqual(rect);
  });

  test('rotate', () => {
    const rotated = rect.clone();
    rotated.rotate(Math.PI / 2);
    expect(rotated.angle).toBe(Math.PI);
  });

  test('from (instance method)', () => {
    const other = new Rect(1, 1, 1, 1, 1);
    rect.from(other);
    expect(rect).toEqual(other);
  });

  test('clone', () => {
    const copy = rect.clone();
    expect(copy).not.toBe(rect);
    expect(copy).toEqual(rect);
  });

  test('getters and setters', () => {
    rect.right = 5;
    expect(rect.right).toBe(5);

    rect.left = -5;
    expect(rect.left).toBe(-5);

    rect.top = -10;
    expect(rect.top).toBe(-10);

    rect.bottom = 10;
    expect(rect.bottom).toBe(10);

    rect.center = [1, 1];
    expect(rect.center.array).toEqual([1, 1]);

    rect.width = 5;
    expect(rect.width).toBe(5);

    rect.height = 15;
    expect(rect.height).toBe(15);
  });
});
