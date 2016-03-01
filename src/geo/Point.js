/*
 * Point is a helper class for ensuring consistent world positions.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/Point.js
 */

class Point {
  constructor(x, y, round) {
    this.x = (round ? Math.round(x) : x);
    this.y = (round ? Math.round(y) : y);
  }

  clone() {
    return new Point(this.x, this.y);
  }

  // Non-destructive
  add(point) {
    return this.clone()._add(_point(point));
  }

  // Destructive
  _add(point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  // Non-destructive
  subtract(point) {
    return this.clone()._subtract(_point(point));
  }

  // Destructive
  _subtract(point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }
}

export default Point;

// Accepts (point), ([x, y]) and (x, y, round)
var _point = function(x, y, round) {
  if (x instanceof Point) {
    return x;
  }
  if (Array.isArray(x)) {
    return new Point(x[0], x[1]);
  }
  if (x === undefined || x === null) {
    return x;
  }
  return new Point(x, y, round);
};

// Initialise without requiring new keyword
export {_point as point};
