/*
 * Transformation is an utility class to perform simple point transformations
 * through a 2d-matrix.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geometry/Transformation.js
 */

import {point as Point} from '../geo/Point';

class Transformation {
  constructor(a, b, c, d) {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
  }

  transform(point, scale) {
    // Copy input point as to not destroy the original data
    return this._transform(point.clone(), scale);
  }

  // Destructive transform (faster)
  _transform(point, scale) {
    scale = scale || 1;

    point.x = scale * (this._a * point.x + this._b);
    point.y = scale * (this._c * point.y + this._d);
    return point;
  }

  untransform(point, scale) {
    scale = scale || 1;
    return Point(
      (point.x / scale - this._b) / this._a,
      (point.y / scale - this._d) / this._c
    );
  }
}

export default Transformation;
