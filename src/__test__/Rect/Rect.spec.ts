import { test, describe, expect } from 'vitest';

import { Rect } from '../../Rect.class';
import { Vector } from '../../Vector.class';
import { Face } from '../../Face.enum';
import { Point } from '../../Point.class';

test('creates', () => {
  const rect = new Rect(5, 10, 15, 20);
  expect(rect).toBeDefined();
  expect(rect.x).toBe(5);
  expect(rect.y).toBe(10);
  expect(rect.width).toBe(15);
  expect(rect.height).toBe(20);
  expect(rect.left).toBe(5 - 15 / 2);
  expect(rect.top).toBe(0);
  expect(rect.right).toBe(12.5);
  expect(rect.bottom).toBe(20);
  expect(rect.center).toEqual([5, 10]);
  expect(rect.position).toEqual([5, 10]);
});

describe('from', () => {
  test('moves and resizes', () => {
    const first = new Rect(2, 8, 10, 25);
    const second = new Rect(4, 5, 2, 2);
    expect(second.x).toBe(4);
    expect(second.y).toBe(5);
    expect(second.width).toBe(2);
    expect(second.height).toBe(2);
    second.from(first);
    expect(second.x).toBe(2);
    expect(second.y).toBe(8);
    expect(second.width).toBe(10);
    expect(second.height).toBe(25);
    second.x += 2;
    expect(second.x).toBe(4);
    expect(first.x).toBe(2);
  });
});

describe('position', () => {
  test('can be set', () => {
    const rect = new Rect(1, 2, 4, 5);
    rect.position = [3, 4];
    expect(rect.position).toEqual([3, 4]);
  });
});

describe('collidePointArray', () => {
  test('detects collision', () => {
    const rect = new Rect(1, 2, 1, 1);
    expect(rect.collidePointArray([0, 0])).toBe(false);
    expect(rect.collidePointArray([1.3, 1.8])).toBe(true);
  });
});

describe('collidePoint', () => {
  test('detects collision', () => {
    const rect = new Rect(1, 2, 1, 1);
    const pointA = new Point(0, 0);
    const pointB = new Point(1.3, 1.8);
    expect(rect.collidePoint(pointA)).toBe(false);
    expect(rect.collidePoint(pointB)).toBe(true);
  });
});

describe('moves', () => {
  test('by x', () => {
    const rect = new Rect(5, 10, 15, 20);
    rect.x += 5;
    expect(rect.x).toBe(10);
    expect(rect.y).toBe(10);
    expect(rect.width).toBe(15);
    expect(rect.height).toBe(20);
  });
  test('by y', () => {
    const rect = new Rect(5, 10, 15, 20);
    rect.y += 7;
    expect(rect.x).toBe(5);
    expect(rect.y).toBe(17);
    expect(rect.width).toBe(15);
    expect(rect.height).toBe(20);
  });
  test('by bottom', () => {
    const rect = new Rect(5, 10, 15, 20);
    rect.bottom = 2;
    expect(rect.x).toBe(5);
    expect(rect.y).toBe(-8);
    expect(rect.width).toBe(15);
    expect(rect.height).toBe(20);
  });
  test('by top', () => {
    const rect = new Rect(5, 10, 15, 20);
    rect.top = 1;
    expect(rect.x).toBe(5);
    expect(rect.y).toBe(11);
    expect(rect.width).toBe(15);
    expect(rect.height).toBe(20);
  });
  test('by left', () => {
    const rect = new Rect(5, 10, 10, 20);
    rect.left = 2;
    expect(rect.x).toBe(7);
  });
  test('by right', () => {
    const rect = new Rect(5, 10, 10, 20);
    rect.right = 11;
    expect(rect.x).toBe(6);
    expect(rect.right).toBe(11);

    const rect2 = new Rect(10, 15, 2, 4);
    rect2.right = 9;
    expect(rect2.right).toBe(9);
  });
});

test('grows', () => {
  const rect = new Rect(5, 10, 15, 20);
  rect.width += 5;
  expect(rect.x).toBe(5);
  expect(rect.y).toBe(10);
  expect(rect.width).toBe(20);
  expect(rect.height).toBe(20);
  rect.height += 7;
  expect(rect.x).toBe(5);
  expect(rect.y).toBe(10);
  expect(rect.width).toBe(20);
  expect(rect.height).toBe(27);
});

describe('collisions', () => {
  const rect = new Rect(10, 15, 2, 4);
  test('xy', () => {
    expect(rect.collideXY(1, 1)).toBe(false);
    expect(rect.collideXY(1, 12.9)).toBe(false);
    expect(rect.collideXY(11, 13)).toBe(true);
    expect(rect.collideXY(10, 17)).toBe(true);
    expect(rect.collideXY(11, 100)).toBe(false);
    expect(rect.collideXY(50, 80)).toBe(false);
    expect(rect.collideXY(1, 80)).toBe(false);
    expect(rect.collideXY(50, 2)).toBe(false);
  });

  test('xy when rotated', () => {
    const rect = new Rect(0, 0, 1.4, 1.4);
    expect(rect.collideXY(0.6, 0.6)).toBe(true);
    rect.rotate(Math.PI / 4);
    expect(rect.collideXY(0.6, 0.6)).toBe(false);
  });

  test('rect', () => {
    const rect2 = new Rect(10, 15, 2, 4);
    expect(rect.collideRect(rect2)).toBe(true);
    rect2.right = rect.left;
    expect(rect.collideRect(rect2)).toBe(false);
    rect2.right -= 0.1;
    expect(rect.collideRect(rect2)).toBe(false);
  });
});

describe('alignTo', () => {
  test('avoids collision', () => {
    const rect1 = new Rect(10, 15, 2, 4);
    const rect2 = new Rect(10, 15, 2, 4);
    rect2.alignTo(rect1, [1, 0]);
    expect(rect2.collideRect(rect1)).toBe(false);
    rect2.alignTo(rect1, [-1, 0]);
    expect(rect2.collideRect(rect1)).toBe(false);
    rect2.alignTo(rect1, [0, -1]);
    expect(rect2.collideRect(rect1)).toBe(false);
    rect2.alignTo(rect1, [0, 1]);
    expect(rect2.collideRect(rect1)).toBe(false);
  });

  test('diagonal collisions pushes to corner', () => {
    const rect1 = new Rect(10.9, 10.9, 1, 1);
    const rect2 = new Rect(10, 10, 1, 1);
    expect(rect2.collideRect(rect1)).toBe(true);
    expect(rect1.collideRect(rect2)).toBe(true);
    rect1.alignTo(rect2, [-1, -1]);
    expect(rect2.collideRect(rect1)).toBe(false);
    expect(rect1.collideRect(rect2)).toBe(false);
    expect(rect1.left).toEqual(rect2.right);
    expect(rect1.top).toEqual(rect2.bottom);
  });

  test('diagonal collisions pushes to corner', () => {
    const rect1 = new Rect(9.6, 9.6, 1, 1);
    const rect2 = new Rect(10, 10, 1, 1);
    expect(rect2.collideRect(rect1)).toBe(true);
    expect(rect1.collideRect(rect2)).toBe(true);
    rect1.alignTo(rect2, [1, 1]);
    expect(rect2.collideRect(rect1)).toBe(false);
    expect(rect1.collideRect(rect2)).toBe(false);
    expect(rect1.right).toEqual(rect2.left);
    expect(rect1.bottom).toEqual(rect2.top);
  });

  test('unequal diagonal collisions push along line', () => {
    const rect1 = new Rect(10.9, 10.1, 1, 1);
    const rect2 = new Rect(10, 10, 1, 1);
    expect(rect2.collideRect(rect1)).toBe(true);
    expect(rect1.collideRect(rect2)).toBe(true);
    rect1.alignTo(rect2, [-1, -1]);
    expect(rect2.collideRect(rect1)).toBe(false);
    expect(rect1.collideRect(rect2)).toBe(false);
    expect(rect1.left).toEqual(rect2.right);
    expect(rect1.y).toEqual(rect2.y + 0.2);
  });

  test('straight down collision aligns bottom to top', () => {
    const rect1 = new Rect(10, 9.1, 1, 1);
    const rect2 = new Rect(10, 10, 1, 1);
    expect(rect2.collideRect(rect1)).toBe(true);
    expect(rect1.collideRect(rect2)).toBe(true);
    expect(rect1.bottom).toBe(9.6);
    rect1.alignTo(rect2, [0, 1]);
    expect(rect2.collideRect(rect1)).toBe(false);
    expect(rect1.collideRect(rect2)).toBe(false);
    expect(rect1.left).toEqual(rect2.left);
    expect(rect1.bottom).toEqual(rect2.top);
  });

  test('straight up collision aligns top to bottom', () => {
    const rect1 = new Rect(10, 10.9, 1, 1);
    const rect2 = new Rect(10, 10, 1, 1);
    expect(rect2.collideRect(rect1)).toBe(true);
    expect(rect1.collideRect(rect2)).toBe(true);
    expect(rect1.top).toBe(10.4);
    rect1.alignTo(rect2, [0, 1]);
    expect(rect2.collideRect(rect1)).toBe(false);
    expect(rect1.collideRect(rect2)).toBe(false);
    expect(rect1.left).toEqual(rect2.left);
    expect(rect1.top).toEqual(rect2.bottom);
  });

  test('straight right collision aligns right to left', () => {
    const rect1 = new Rect(9.1, 10, 1, 1);
    const rect2 = new Rect(10, 10, 1, 1);
    expect(rect2.collideRect(rect1)).toBe(true);
    expect(rect1.collideRect(rect2)).toBe(true);
    expect(rect1.right).toBe(9.6);
    rect1.alignTo(rect2, [1, 0]);
    expect(rect2.collideRect(rect1)).toBe(false);
    expect(rect1.collideRect(rect2)).toBe(false);
    expect(rect1.top).toEqual(rect2.top);
    expect(rect1.right).toEqual(rect2.left);
  });

  test('straight left collision aligns left to right', () => {
    const rect1 = new Rect(10.9, 10, 1, 1);
    const rect2 = new Rect(10, 10, 1, 1);
    expect(rect2.collideRect(rect1)).toBe(true);
    expect(rect1.collideRect(rect2)).toBe(true);
    expect(rect1.left).toBe(10.4);
    rect1.alignTo(rect2, [1, 0]);
    expect(rect2.collideRect(rect1)).toBe(false);
    expect(rect1.collideRect(rect2)).toBe(false);
    expect(rect1.top).toEqual(rect2.top);
    expect(rect1.left).toEqual(rect2.right);
  });

  test('straight left collision aligns left to right with negative v.x', () => {
    const rect1 = new Rect(10.9, 10, 1, 1);
    const rect2 = new Rect(10, 10, 1, 1);
    expect(rect2.collideRect(rect1)).toBe(true);
    expect(rect1.collideRect(rect2)).toBe(true);
    expect(rect1.left).toBe(10.4);
    rect1.alignTo(rect2, [-1, 0]);
    expect(rect2.collideRect(rect1)).toBe(false);
    expect(rect1.collideRect(rect2)).toBe(false);
    expect(rect1.top).toEqual(rect2.top);
    expect(rect1.left).toEqual(rect2.right);
  });
});

describe('alignToFace', () => {
  test('avoids collision', () => {
    const rect1 = new Rect(7, 8, 4, 5);
    const rect2 = new Rect(1, 2, 3, 4);
    rect2.alignToFace(rect1, Face.NONE);
    expect(rect2.position).toEqual([1, 2]);
    rect2.alignToFace(rect1, Face.TOP);
    expect(rect2.bottom).toEqual(rect1.top);
    rect2.alignToFace(rect1, Face.BOTTOM);
    expect(rect2.top).toEqual(rect1.bottom);
    rect2.alignToFace(rect1, Face.LEFT);
    expect(rect2.right).toEqual(rect1.left);
    rect2.alignToFace(rect1, Face.RIGHT);
    expect(rect2.left).toEqual(rect1.right);
  });
});

describe('collisionFace', () => {
  test('no vector', () => {
    const rect1 = new Rect(15, 10, 2, 4);
    const rect2 = new Rect(15, 15, 2, 4);
    const moveVector = new Vector(0, 0);
    expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.NONE);
  });
  describe('single axis', () => {
    test('from TOP', () => {
      const rect1 = new Rect(15, 10, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(0, 10);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.TOP);
    });
    test('from BOTTOM', () => {
      const rect1 = new Rect(15, 10, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(0, -10);
      expect(rect1.collisionFace(rect2, moveVector)).toBe(Face.BOTTOM);
    });
    test('from RIGHT', () => {
      const rect1 = new Rect(10, 15, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(-10, 0);
      expect(rect1.collisionFace(rect2, moveVector)).toBe(Face.RIGHT);
    });
    test('from LEFT', () => {
      const rect1 = new Rect(10, 15, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(10, 0);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.LEFT);
    });
    test('touching LEFT moving BOTTOM', () => {
      const rect1 = new Rect(13, 15, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(0, 1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.LEFT);
    });
    test('inside moving RIGHT', () => {
      const player = new Rect(15, 15, 2, 2);
      const tile = new Rect(15, 15, 4, 4);
      const moveVector = new Vector(1, 0);
      expect(tile.collisionFace(player, moveVector)).toBe(Face.NONE);
    });
  });

  describe('double axis', () => {
    test('from TOPTOPLEFT', () => {
      const rect1 = new Rect(14, 10, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(1, 1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.TOP);
    });
    test('from LEFTTOPLEFT', () => {
      const rect1 = new Rect(10, 14, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(1, 1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.LEFT);
    });
    test('from LEFTBOTTOMLEFT', () => {
      const rect1 = new Rect(10, 16, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(1, -1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.LEFT);
    });
    test('from BOTTOMBOTTOMLEFT', () => {
      const rect1 = new Rect(14, 20, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(1, -1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.BOTTOM);
    });
    test('from TOPTOPRIGHT', () => {
      const rect1 = new Rect(16, 10, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(-1, 1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.TOP);
    });
    test('from RIGHTTOPRIGHT', () => {
      const rect1 = new Rect(20, 14, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(-1, 1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.RIGHT);
    });
    test('from RIGHTBOTTOMRIGHT', () => {
      const rect1 = new Rect(20, 16, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(-1, -1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.RIGHT);
    });
    test('from BOTTOMBOTTOMRIGHT', () => {
      const rect1 = new Rect(16, 20, 2, 4);
      const rect2 = new Rect(15, 15, 2, 4);
      const moveVector = new Vector(-1, -1);
      expect(rect2.collisionFace(rect1, moveVector)).toBe(Face.BOTTOM);
    });
  });
});

describe('RectPA', () => {
  describe('Copy', () => {
    test('creates equal rect', () => {
      const rect = new Rect(10, 20, 30, 40);
      const other = Rect.from(rect);
      expect(other).toEqual(rect);
      expect(other).not.toBe(rect);
    });
  });
  test('resizeAndRecenter', () => {
    let rect = new Rect(10, 20, 30, 40);
    let center = [...rect.center];
    rect.resizeAndRecenter([20, 25]);
    expect(center).toEqual(rect.center);
  });
  test('teleportTo', () => {
    let rect = new Rect(10, 20, 30, 40);
    rect.teleportTo([56, 57]);
    expect(rect.center).toEqual([56, 57]);
  });
});

describe('perimeter', () => {
  test('returns perimeter', () => {
    const rect = new Rect(10, 20, 30, 40);
    expect(rect.perimeter).toBe(140);
  });
});

describe('area', () => {
  test('returns area', () => {
    const rect = new Rect(10, 20, 30, 40);
    expect(rect.area).toBe(1200);
  });
});
