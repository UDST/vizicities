/*
 * Wrap the given number to lie within a certain range (eg. longitude)
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/core/Util.js
 */

var wrapNum = function(x, range, includeMax) {
  var max = range[1];
  var min = range[0];
  var d = max - min;
  return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
};

export default wrapNum;
