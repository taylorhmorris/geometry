import { describe, expect, test } from 'vitest';

import { newRect } from '../../utils/newRect';

describe('newRect', () => {
  test('should create a rect from the parameters as corners', () => {
    const [x1, y1, x2, y2] = [10, 10, 20, 20];
    const r = newRect(x1, y1, x2, y2);
    expect(r.top).toEqual(y1);
    expect(r.left).toEqual(x1);
    expect(r.bottom).toEqual(y2);
    expect(r.right).toEqual(x2);
    expect(r.width).toEqual(x2 - x1);
    expect(r.height).toEqual(y2 - y1);
  });

  test('should create a rect from the parameters even reversed', () => {
    const [x1, y1, x2, y2] = [20, 20, 10, 10];
    const r = newRect(x1, y1, x2, y2);
    expect(r.top).toEqual(y1);
    expect(r.left).toEqual(x1);
    expect(r.bottom).toEqual(y2);
    expect(r.right).toEqual(x2);
    expect(r.width).toEqual(x2 - x1);
    expect(r.height).toEqual(y2 - y1);
  });

  test('should create a rect from random parameters', () => {
    const [x1, y1, x2, y2] = [-5, 61, 11, -5];
    const r = newRect(x1, y1, x2, y2);
    expect(r.top).toEqual(y1);
    expect(r.left).toEqual(x1);
    expect(r.bottom).toEqual(y2);
    expect(r.right).toEqual(x2);
    expect(r.width).toEqual(x2 - x1);
    expect(r.height).toEqual(y2 - y1);
  });
});
