import { test, describe, expect, beforeEach } from 'vitest';

import { Vector } from '../Vector.class';

describe('Vector', () => {
  let vector: Vector;

  beforeEach(() => {
    vector = new Vector(1, 1);
  });

  // Lines 26-27
  test('should copy the vector', () => {
    const copy = vector.copy();
    expect(copy.x).toEqual(vector.x);
    expect(copy.y).toEqual(vector.y);
  });

  // Lines 47-49
  test('should set magnitude', () => {
    vector.magnitude = 2;
    expect(vector.magnitude).toBeCloseTo(2);
  });

  // Lines 54-55
  test('should set direction', () => {
    const angle = Math.PI / 4; // 45 degrees
    vector.direction = angle;
    expect(vector.direction).toBeCloseTo(angle);
  });

  // Lines 79-80
  test('should rotate the vector', () => {
    const angle = Math.PI / 2; // 90 degrees
    vector.rotate(angle);
    const expectedX = -1;
    const expectedY = 1;
    expect(vector.x).toBeCloseTo(expectedX);
    expect(vector.y).toBeCloseTo(expectedY);
  });
});
