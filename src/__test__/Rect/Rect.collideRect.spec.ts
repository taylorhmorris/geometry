import { expect, test } from 'vitest';
import { Rect } from '../../Rect.class';

test('rect', () => {
  const rect = new Rect(10, 15, 2, 4);
  const rect2 = new Rect(10, 15, 2, 4);
  expect(rect.collideRect(rect2)).toBe(true);
  rect2.right = rect.left;
  expect(rect.collideRect(rect2)).toBe(false);
  rect2.right -= 0.1;
  expect(rect.collideRect(rect2)).toBe(false);
});

test('rotated rect', () => {
  const rect = new Rect(10, 15, 6, 8);
  const rect2 = new Rect(10, 15, 6, 8);
  rect2.rotate(Math.PI / 4);
  expect(rect.collideRect(rect2)).toBe(true);
  rect2.right = rect.left;
  expect(rect.collideRect(rect2)).toBe(true);
  rect2.right -= 1;
  expect(rect.collideRect(rect2)).toBe(true);
  rect2.rotate(-Math.PI / 4);
  expect(rect.collideRect(rect2)).toBe(false);
});
