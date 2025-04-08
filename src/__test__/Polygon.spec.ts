import { describe, expect, it } from 'vitest';

import { Polygon } from '../Polygon.class';
import { Point } from '../Point.class';

describe('Polygon', () => {
  it('creates', () => {
    const polygon = new Polygon([new Point(1, 2), new Point(3, 4)]);
    expect(polygon).toBeDefined();
    expect(polygon.points.length).toBe(2);
    expect(polygon.points[0].x).toBe(1);
    expect(polygon.points[0].y).toBe(2);
    expect(polygon.points[1].x).toBe(3);
    expect(polygon.points[1].y).toBe(4);
  });

  it('copies', () => {
    const polygon = new Polygon([new Point(1, 2), new Point(3, 4)]);
    const copy = polygon.copy();
    expect(copy).not.toBe(polygon);
    expect(copy.points.length).toBe(2);
    expect(copy.points[0].x).toBe(1);
    expect(copy.points[0].y).toBe(2);
    expect(copy.points[1].x).toBe(3);
    expect(copy.points[1].y).toBe(4);
  });

  it('sets points', () => {
    const polygon = new Polygon([new Point(1, 2), new Point(3, 4)]);
    polygon.points = [new Point(5, 6), new Point(7, 8)];
    expect(polygon.points.length).toBe(2);
    expect(polygon.points[0].x).toBe(5);
    expect(polygon.points[0].y).toBe(6);
    expect(polygon.points[1].x).toBe(7);
    expect(polygon.points[1].y).toBe(8);
  });
});

describe('Triangle', () => {
  it('creates', () => {
    const triangle = new Polygon([
      new Point(1, 2),
      new Point(3, 4),
      new Point(5, 6),
    ]);
    expect(triangle).toBeDefined();
    expect(triangle.points.length).toBe(3);
    expect(triangle.points[0].x).toBe(1);
    expect(triangle.points[0].y).toBe(2);
    expect(triangle.points[1].x).toBe(3);
    expect(triangle.points[1].y).toBe(4);
    expect(triangle.points[2].x).toBe(5);
    expect(triangle.points[2].y).toBe(6);
  });

  it('has the correct perimeter', () => {
    const triangle = new Polygon([
      new Point(0, 0),
      new Point(3, 0),
      new Point(3, 4),
    ]);
    expect(triangle.perimeter).toBeCloseTo(12);
  });

  it('has the correct area', () => {
    const triangle = new Polygon([
      new Point(0, 0),
      new Point(3, 0),
      new Point(3, 4),
    ]);
    expect(triangle.area).toBeCloseTo(6);
  });
});

describe('Rectangle', () => {
  it('creates', () => {
    const rectangle = new Polygon([
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    ]);
    expect(rectangle).toBeDefined();
    expect(rectangle.points.length).toBe(4);
    expect(rectangle.points[0].x).toBe(0);
    expect(rectangle.points[0].y).toBe(0);
    expect(rectangle.points[1].x).toBe(4);
    expect(rectangle.points[1].y).toBe(0);
    expect(rectangle.points[2].x).toBe(4);
    expect(rectangle.points[2].y).toBe(3);
    expect(rectangle.points[3].x).toBe(0);
    expect(rectangle.points[3].y).toBe(3);
  });

  it('has the correct perimeter', () => {
    const rectangle = new Polygon([
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    ]);
    expect(rectangle.perimeter).toBeCloseTo(14);
  });

  it('has the correct area', () => {
    const rectangle = new Polygon([
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    ]);
    expect(rectangle.area).toBeCloseTo(12);
  });
});

describe('Pentagon', () => {
  const a = 5;
  const h = 7.694;
  let x1 = -1.55;
  const y1 = Math.sqrt(Math.pow(a, 2) - Math.pow(x1, 2));
  const z1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
  expect(z1).toBeCloseTo(a);
  x1 = -a / 2 + x1;
  const pentagon = new Polygon([
    new Point(a / 2, 0),
    new Point(-a / 2, 0),
    new Point(x1, y1),
    new Point(0, h),
    new Point(-x1, y1),
  ]);
  it('creates', () => {
    const pentagon2 = new Polygon([
      new Point(0, 0),
      new Point(2, 2),
      new Point(1, 4),
      new Point(-1, 4),
      new Point(-2, 2),
    ]);
    expect(pentagon2).toBeDefined();
    expect(pentagon2.points.length).toBe(5);
    expect(pentagon2.points[0].x).toBe(0);
    expect(pentagon2.points[0].y).toBe(0);
    expect(pentagon2.points[1].x).toBe(2);
    expect(pentagon2.points[1].y).toBe(2);
    expect(pentagon2.points[2].x).toBe(1);
    expect(pentagon2.points[2].y).toBe(4);
    expect(pentagon2.points[3].x).toBe(-1);
    expect(pentagon2.points[3].y).toBe(4);
    expect(pentagon2.points[4].x).toBe(-2);
    expect(pentagon2.points[4].y).toBe(2);
  });

  it('has the correct perimeter', () => {
    expect(pentagon.points[0].distanceTo(pentagon.points[1])).toBeCloseTo(5);
    expect(pentagon.points[1].distanceTo(pentagon.points[2])).toBeCloseTo(5);
    expect(pentagon.points[2].distanceTo(pentagon.points[3])).toBeCloseTo(5);
    expect(pentagon.points[3].distanceTo(pentagon.points[4])).toBeCloseTo(5);
    expect(pentagon.points[4].distanceTo(pentagon.points[0])).toBeCloseTo(5);
    expect(pentagon.perimeter).toBeCloseTo(25, 1);
  });
  it('has the correct area', () => {
    expect(pentagon.points[0].distanceTo(pentagon.points[1])).toBeCloseTo(5);
    expect(pentagon.area).toBeCloseTo(43.01, 1);
  });
});
