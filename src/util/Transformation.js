/*
 * Transformation is an utility class to perform simple point transformations
 * through a 2d-matrix.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geometry/Transformation.js
 */

class Transformation {
  constructor(a, b, c, d) {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
  }

  transform(point, scale) {
    // Copy input point as to not destroy the original data
    return this._transform([point[0], point[1]], scale);
  }

  // Destructive transform (faster)
  _transform(point, scale) {
    scale = scale || 1;

    point[0] = scale * (this._a * point[0] + this._b);
    point[1] = scale * (this._c * point[1] + this._d);
    return point;
  }

  untransform(point, scale) {
    scale = scale || 1;
    return [
      (point[0] / scale - this._b) / this._a,
      (point[1] / scale - this._d) / this._c
    ];
  }
}

export default Transformation;
