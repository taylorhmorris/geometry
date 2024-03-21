import { test, describe, expect } from 'vitest';

import { Rect } from '../../Rect.class';
import { Point } from '../../Point.class';
import { PointArray } from '../../PointArray.type';
import { newRect } from '../../utils/newRect';

describe('collidePoint is the same with Point or PointArray', () => {
  test('detects collision', () => {
    const rect = new Rect(400, 300, 400, 300);
    const pointA = new Point(400, 400);
    const pointArray: PointArray = [pointA.x, pointA.y];

    expect(rect.collidePoint(pointArray)).toBe(true);
    expect(rect.collidePoint(pointA)).toBe(true);
  });

  test('detects collision on rotated rect', () => {
    const p = new Point(1.5, 2.5);
    const r = newRect(1, 1, 3, 2);
    r.rotate(-Math.PI / 2);
    expect(r.collidePoint(p)).toBe(true);
  });
});
