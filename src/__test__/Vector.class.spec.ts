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
    const vec2 = Vector.from(vec);
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
  test('1 0 0', () => {
    const vec = new Vector(1, 0);
    expect(vec.direction).toBeCloseTo(0);
  });
  test('0 1 PI/2', () => {
    const vec = new Vector(0, 1);
    expect(vec.direction).toBeCloseTo(Math.PI / 2);
  });

  describe('set', () => {
    test('turn does not change magnitude', () => {
      const vec = new Vector(1, 1);
      const magnitude = vec.magnitude;
      const newDirection = Math.PI / 2;
      vec.direction = newDirection;
      expect(vec.magnitude).toBeCloseTo(magnitude);
      expect(vec.direction).toBeCloseTo(newDirection);
    });

    test('negative turn does not change magnitude', () => {
      const vec = new Vector(0, 1);
      const magnitude = vec.magnitude;
      const newDirection = Math.PI / 2;
      vec.direction = newDirection;
      expect(vec.magnitude).toBeCloseTo(magnitude);
      expect(vec.direction).toBeCloseTo(newDirection);
    });

    test('from quad4 to quad1', () => {
      const vec = new Vector(0.5, -1);
      const magnitude = vec.magnitude;
      const newDirection = Math.PI / 4;
      vec.direction = newDirection;
      expect(vec.magnitude).toBeCloseTo(magnitude);
      expect(vec.direction).toBeCloseTo(newDirection);
    });

    test('from quad3 to quad1', () => {
      const vec = new Vector(-1, -1);
      const magnitude = vec.magnitude;
      const newDirection = Math.PI / 4;
      vec.direction = newDirection;
      expect(vec.magnitude).toBeCloseTo(magnitude);
      expect(vec.direction).toBeCloseTo(newDirection);
    });

    test('from quad1 to quad3', () => {
      const vec = new Vector(1, 1);
      const magnitude = vec.magnitude;
      expect(vec.direction).toBe(Math.PI / 4);
      const newDirection = (5 * Math.PI) / 4;
      vec.direction = newDirection;
      expect(vec.x).toBeCloseTo(-1);
      expect(vec.y).toBeCloseTo(-1);
      expect(vec.magnitude).toBeCloseTo(magnitude);
      expect(vec.direction).toBeCloseTo(newDirection - 2 * Math.PI);
    });
  });

  describe('rotate', () => {
    test('rotates by a given angle', () => {
      const vec = new Vector(0, 1);
      expect(vec.direction).toBeCloseTo(Math.PI / 2);
      vec.rotate(Math.PI);
      expect(vec.direction).toBeCloseTo(-Math.PI / 2);
    });
  });
});

describe('dotProduct', () => {
  test('with 90deg angle should be zero', () => {
    const v1 = new Vector(0, 5);
    const v2 = new Vector(5, 0);
    expect(v1.dotProduct(v2)).toBe(0);
    expect(v2.dotProduct(v1)).toBe(0);
  });

  test('-6, 8 and 5, 12 should be 66', () => {
    const v1 = new Vector(-6, 8);
    const v2 = new Vector(5, 12);
    expect(v1.dotProduct(v2)).toBe(66);
    expect(v2.dotProduct(v1)).toBe(66);
  });
});

describe('toString', () => {
  test('toString', () => {
    const vec = new Vector(1, 2);
    expect(vec.toString()).toBe('Vector<1, 2>');
  });
});
