# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project will adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) after version 1.0.0.

## [Unreleased]

### Added

- Point.toString method
- Vector.toString method
- Rect.toString method
- Circle.toString method

## [0.0.11] - 2025-03-16

### Added

- Rect.clone()
- Rect.intersects()

### Fixed

- Rect.collidePoint incorrectly handling rotation

### Removed

- Rect.copy
- Rect#copy
- Rect#position
- Rect#collideRectSimple
- Rect.rotate
- Rect#centerPoint
- Rect.collideX
- Rect.collideY
- Rect.collideXY
- Rect.collidePointArray
- Rect.collisionFace
- Rect.alignToFace
- Rect.alignTo
- Circle.copy
- Vector.copy
- Point.copy


## [0.0.10] - 2025-03-15

### Security

- Update dependencies to address security vulnerabilities

## [0.0.9] - 2024-01-19

### Added

- Circle.circumference
- Circle.area
- Circle.collidePoint
- Rect.perimeter
- Rect.area
- Vector.crossProduct

## [0.0.8] - 2024-01-08

### Changed

- Circle.collideRect now accounts for rotation
- Rect.collideXY now accounts for rotation

### Fixed

- Point.from infinite recursion

### Deprecated

- Rect.collideX
- Rect.collideY

## [0.0.7] - 2023-09-09

### Added

- rotation angle for Rect
- rotate method for Point
- Point.from now accepts PointArray
- Rect.rotate
- Point.array
- Rect.centerPoint
- Rect.points
- Vector.dotProduct

### Changed

- Point.copy now returns a copy of the Point instead.
- Circle.copy now returns a copy of the Circle instead.
- Vector.copy now returns a copy of the Vector instead.
- Rect.copy now returns a copy of the Vector instead.
- Circle.center is now a point
- Circle.x and Circle.y are now getters and setters for Circle.center
- Circle constructor now takes a Point or PointArray
- Rect.collide now supports rotated Rects

### Fixed
- static Circle.from now properly returns a new Circle.
- Circle.collideCircle now properly detects collisions.

### Deprecated

- static Point.copy
- static Circle.copy
- static Vector.copy
- static Rect.copy
- Rect.collisionFace
- Rect.alignToFace
- Rect.alignTo

### Security
- Update Chaijs, postcss, and vite to address vulnerabilities

## [0.0.6] - 2023-05-30

### Added

- Setter for Vector.direction
- Vector.rotate to rotate by a given angle
- Point class
- Rect.collidePoint

## [0.0.5] - 2023-05-23

### Fixed

- Rect.alignTo infinite slope error

## [0.0.4] - 2023-05-23

### Changed

- Rect.alignTo moves Rect smoothly along line

## [0.0.3] - 2023-05-21

### Changed

- Rect.alignTo moves Rect along both axes

## [0.0.2] - 2023-04-08

### Added

- Support for CommonJS
- Documentation Comments

### Changed

- renamed Rect.collidePoint to Rect.collidePointArray

## [0.0.1] - 2023-04-07

### Added

- Geometry library

[unreleased]: https://github.com/taylorhmorris/geometry/compare/v0.0.11...HEAD
[0.0.11]: https://github.com/taylorhmorris/geometry/compare/v0.0.10...v0.0.11 
[0.0.10]: https://github.com/taylorhmorris/geometry/compare/v0.0.9...v0.0.10 
[0.0.9]: https://github.com/taylorhmorris/geometry/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/taylorhmorris/geometry/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/taylorhmorris/geometry/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/taylorhmorris/geometry/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/taylorhmorris/geometry/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/taylorhmorris/geometry/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/taylorhmorris/geometry/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/taylorhmorris/geometry/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/taylorhmorris/geometry/releases/tag/v0.0.1
