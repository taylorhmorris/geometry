import { test, describe, expect } from 'vitest';

import { Rect } from '../../Rect.class';
import { Point } from '../../Point.class';
import { PointArray } from '../../PointArray.type';

describe('collidePointis the same with Point or PointArray', () => {
  test('detects collision', () => {
    const rect = new Rect(400, 300, 400, 300);
    const pointA = new Point(400, 400);
    const pointArray: PointArray = [pointA.x, pointA.y];

    expect(rect.collidePoint(pointArray)).toBe(true);
    expect(rect.collidePoint(pointA)).toBe(true);
  });
});
