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
});
