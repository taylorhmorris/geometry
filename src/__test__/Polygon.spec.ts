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

  it('has the correct centroid', () => {
    const triangle = new Polygon([
      new Point(0, 0),
      new Point(3, 0),
      new Point(3, 4),
    ]);
    const centroid = triangle.centroid;
    expect(centroid.x).toBeCloseTo(2);
    expect(centroid.y).toBeCloseTo(4 / 3);
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

  it('has the correct centroid', () => {
    const rectangle = new Polygon([
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    ]);
    const centroid = rectangle.centroid;
    expect(centroid.x).toBeCloseTo(2);
    expect(centroid.y).toBeCloseTo(1.5);
  });
});

describe('Pentagon', () => {
  // This pentagon is a regular pentagon and is used for perimeter and area tests.
  const a = 5;
  const h = 7.694;
  let x1_regular = -1.55;
  const y1_regular = Math.sqrt(Math.pow(a, 2) - Math.pow(x1_regular, 2));
  const z1_regular = Math.sqrt(Math.pow(x1_regular, 2) + Math.pow(y1_regular, 2));
  expect(z1_regular).toBeCloseTo(a);
  x1_regular = -a / 2 + x1_regular;
  const regularPentagon = new Polygon([
    new Point(a / 2, 0),
    new Point(-a / 2, 0),
    new Point(x1_regular, y1_regular),
    new Point(0, h),
    new Point(-x1_regular, y1_regular),
  ]);

  // This pentagon is used for the centroid test as its coordinates are simpler.
  const irregularPentagon = new Polygon([
    new Point(0, 0),
    new Point(2, 2),
    new Point(1, 4),
    new Point(-1, 4),
    new Point(-2, 2),
  ]);

  it('creates', () => {
    expect(irregularPentagon).toBeDefined();
    expect(irregularPentagon.points.length).toBe(5);
    expect(irregularPentagon.points[0].x).toBe(0);
    expect(irregularPentagon.points[0].y).toBe(0);
    expect(irregularPentagon.points[1].x).toBe(2);
    expect(irregularPentagon.points[1].y).toBe(2);
    expect(irregularPentagon.points[2].x).toBe(1);
    expect(irregularPentagon.points[2].y).toBe(4);
    expect(irregularPentagon.points[3].x).toBe(-1);
    expect(irregularPentagon.points[3].y).toBe(4);
    expect(irregularPentagon.points[4].x).toBe(-2);
    expect(irregularPentagon.points[4].y).toBe(2);
  });

  it('has the correct perimeter for a regular pentagon', () => {
    expect(regularPentagon.points[0].distanceTo(regularPentagon.points[1])).toBeCloseTo(5);
    expect(regularPentagon.points[1].distanceTo(regularPentagon.points[2])).toBeCloseTo(5);
    expect(regularPentagon.points[2].distanceTo(regularPentagon.points[3])).toBeCloseTo(5);
    expect(regularPentagon.points[3].distanceTo(regularPentagon.points[4])).toBeCloseTo(5);
    expect(regularPentagon.points[4].distanceTo(regularPentagon.points[0])).toBeCloseTo(5);
    expect(regularPentagon.perimeter).toBeCloseTo(25, 1);
  });

  it('has the correct area for a regular pentagon', () => {
    expect(regularPentagon.points[0].distanceTo(regularPentagon.points[1])).toBeCloseTo(5);
    expect(regularPentagon.area).toBeCloseTo(43.01, 1);
  });

  it('has the correct centroid for an irregular pentagon', () => {
    const centroid = irregularPentagon.centroid;
    expect(centroid.x).toBeCloseTo(0);
    expect(centroid.y).toBeCloseTo(34 / 15); // 2.2666...
  });
});

describe('Degenerate Polygons', () => {
  it('returns (0,0) centroid for a line (zero area)', () => {
    const line = new Polygon([new Point(1, 1), new Point(3, 3)]);
    const centroid = line.centroid;
    expect(line.area).toBeCloseTo(0);
    expect(centroid.x).toBeCloseTo(0);
    expect(centroid.y).toBeCloseTo(0);
  });

  it('returns (0,0) centroid for a single point (zero area)', () => {
    const pointPolygon = new Polygon([new Point(5, 5)]);
    const centroid = pointPolygon.centroid;
    // Area for a single point polygon might be NaN or 0 depending on implementation,
    // but centroid should be (0,0) as per requirement for zero area.
    // Let's check if area is indeed 0 for our implementation.
    expect(pointPolygon.area).toBeCloseTo(0);
    expect(centroid.x).toBeCloseTo(0);
    expect(centroid.y).toBeCloseTo(0);
  });

  it('returns (0,0) centroid for a polygon with collinear points (zero area)', () => {
    const collinearPolygon = new Polygon([
      new Point(0, 0),
      new Point(1, 1),
      new Point(2, 2),
      new Point(3, 3),
    ]);
    const centroid = collinearPolygon.centroid;
    expect(collinearPolygon.area).toBeCloseTo(0);
    expect(centroid.x).toBeCloseTo(0);
    expect(centroid.y).toBeCloseTo(0);
  });
});
