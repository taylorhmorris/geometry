import { test, describe, expect } from 'vitest';

import { Rect } from '../../Rect.class';

describe('Rect.rotate', () => {
  test('changes angle', () => {
    let rect = new Rect(10, 20, 30, 40);
    rect.rotate(Math.PI / 2);
    expect(rect.angle).toEqual(Math.PI / 2);
    rect.rotate(Math.PI / 3);
    expect(rect.angle).toBeCloseTo((5 * Math.PI) / 6, 14);
    expect(rect.angle).not.toBeCloseTo((11 * Math.PI) / 12, 14);
  });
  test('moves center', () => {
    let rect = new Rect(10, 20, 30, 40);
    rect.rotate(Math.PI, [0, 0]);
    expect(rect.angle).toEqual(Math.PI);
    expect(rect.x).toBeCloseTo(-10, 14);
    expect(rect.y).toBeCloseTo(-20, 14);
  });
});
