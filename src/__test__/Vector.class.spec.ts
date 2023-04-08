import { test, describe, expect } from 'vitest';

import { Vector } from '../Vector.class';

describe('constructor', () => {
  test('creates with x and y', () => {
    const vec = new Vector(1, 2);
    expect(vec.x).toBe(1);
    expect(vec.y).toBe(2);
  });
  test('creates with -x and y', () => {
    const vec = new Vector(-5, 99);
    expect(vec.x).toBe(-5);
    expect(vec.y).toBe(99);
  });
  test('creates with x and -y', () => {
    const vec = new Vector(5, -7);
    expect(vec.x).toBe(5);
    expect(vec.y).toBe(-7);
  });
});

describe('static', () => {
  test('can be copied', () => {
    const vec = new Vector(3, 5);
    const vec2 = Vector.copy(vec);
    expect(vec2.x).toBe(3);
    expect(vec2.y).toBe(5);
    vec.x = 6;
    vec.y = 7;
    expect(vec.x).toBe(6);
    expect(vec.y).toBe(7);
    expect(vec2.x).toBe(3);
    expect(vec2.y).toBe(5);
  });
});

describe('magnitude', () => {
  test('3 4 5', () => {
    const vec = new Vector(3, 4);
    expect(vec.magnitude).toBe(5);
  });

  test('0 0 0', () => {
    const vec = new Vector(0, 0);
    expect(vec.magnitude).toBe(0);
  });

  test('6 -6 sqrt(72)', () => {
    const vec = new Vector(6, -6);
    expect(vec.magnitude).toBeCloseTo(Math.sqrt(72));
  });

  describe('set', () => {
    test('(2, 5) -> ||9||', () => {
      const vec = new Vector(2, 5);
      const originalDirection = vec.direction;
      expect(vec.magnitude).toBeCloseTo(29 ** 0.5);
      vec.magnitude = 9;
      expect(vec.magnitude).toBeCloseTo(9);
      expect(vec.direction).toEqual(originalDirection);
    });

    test('(0, 0) -> ||5||', () => {
      const vec = new Vector(0, 0);
      const originalDirection = vec.direction;
      vec.magnitude = 5;
      expect(vec.magnitude).toBe(0);
      expect(vec.direction).toEqual(originalDirection);
    });
  });
});

describe('direction', () => {
  test('3 4 5', () => {
    const vec = new Vector(3, 4);
    expect(vec.direction).toBeCloseTo((53.1301 * Math.PI) / 180);
  });
  test('6 -6 -45deg', () => {
    const vec = new Vector(6, -6);
    expect(vec.direction).toBeCloseTo((-45 * Math.PI) / 180);
  });
});
