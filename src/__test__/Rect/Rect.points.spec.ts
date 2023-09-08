import { test, describe, expect } from 'vitest';

import { Rect } from '../../Rect.class';

test('simple square returns points', () => {
  const rect = new Rect(2, 2, 2, 2);
  expect(rect.points[0].x).toEqual(1);
  expect(rect.points[0].y).toEqual(1);
  expect(rect.points[1].x).toEqual(3);
  expect(rect.points[1].y).toEqual(1);
  expect(rect.points[2].x).toEqual(3);
  expect(rect.points[2].y).toEqual(3);
  expect(rect.points[3].x).toEqual(1);
  expect(rect.points[3].y).toEqual(3);
});

test('rotated square returns points', () => {
  const rect = new Rect(2, 2, 2, 2);
  rect.rotate(-Math.PI / 2);
  expect(rect.points[0].x).toBeCloseTo(1);
  expect(rect.points[0].y).toBeCloseTo(3);
  expect(rect.points[1].x).toBeCloseTo(1);
  expect(rect.points[1].y).toBeCloseTo(1);
  expect(rect.points[2].x).toBeCloseTo(3);
  expect(rect.points[2].y).toBeCloseTo(1);
  expect(rect.points[3].x).toBeCloseTo(3);
  expect(rect.points[3].y).toBeCloseTo(3);
});

test('simple rect returns points', () => {
  const rect = new Rect(2, 2, 2, 4);
  expect(rect.points[0].x).toEqual(1);
  expect(rect.points[0].y).toEqual(0);
  expect(rect.points[1].x).toEqual(3);
  expect(rect.points[1].y).toEqual(0);
  expect(rect.points[2].x).toEqual(3);
  expect(rect.points[2].y).toEqual(4);
  expect(rect.points[3].x).toEqual(1);
  expect(rect.points[3].y).toEqual(4);
});

test('rotated rect returns points', () => {
  const rect = new Rect(2, 2, 2, 4);
  rect.rotate(-Math.PI / 2);
  expect(rect.points[0].x).toBeCloseTo(0);
  expect(rect.points[0].y).toBeCloseTo(3);
  expect(rect.points[1].x).toBeCloseTo(0);
  expect(rect.points[1].y).toBeCloseTo(1);
  expect(rect.points[2].x).toBeCloseTo(4);
  expect(rect.points[2].y).toBeCloseTo(1);
  expect(rect.points[3].x).toBeCloseTo(4);
  expect(rect.points[3].y).toBeCloseTo(3);
});

test('rect returns correct points', () => {
  const rect = new Rect(0, 0, 8, 6);
  expect(rect.points[0].x).toEqual(-4);
  expect(rect.points[0].y).toEqual(-3);
  expect(rect.points[1].x).toEqual(4);
  expect(rect.points[1].y).toEqual(-3);
  expect(rect.points[2].x).toEqual(4);
  expect(rect.points[2].y).toEqual(3);
  expect(rect.points[3].x).toEqual(-4);
  expect(rect.points[3].y).toEqual(3);
});

test('rect rotated by 45deg returns correct points', () => {
  const rect = new Rect(0, 0, 8, 6);
  rect.rotate(-Math.PI / 4);
  expect(rect.points[0].x).toBeCloseTo(-5, 0);
  expect(rect.points[0].y).toBeCloseTo(0, -0.2);
  expect(rect.points[1].x).toBeCloseTo(0, -0.2);
  expect(rect.points[1].y).toBeCloseTo(-5, 0);
  expect(rect.points[2].x).toBeCloseTo(5, 0);
  expect(rect.points[2].y).toBeCloseTo(0, -0.2);
  expect(rect.points[3].x).toBeCloseTo(0, -0.2);
  expect(rect.points[3].y).toBeCloseTo(5, 0);
});
