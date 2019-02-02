var Stringify = (function() {
  var functionToString = function(f) {
    return f.toString();
  };

  // Based on https://github.com/tangrams/tangram/blob/2a31893c814cf15d5077f87ffa10af20160716b9/src/utils/utils.js#L245
  var stringToFunction = function(str) {
    if (typeof str === 'string' && str.match(/^\s*function\s*\w*\s*\([\s\S]*\)\s*\{[\s\S]*\}/m) != null) {
      var f;

      try {
        eval('f = ' + str);
        return f;
      } catch (err) {
        return str;
      }
    }
  };

  return {
    functionToString: functionToString,
    stringToFunction: stringToFunction
  };
})();

export default Stringify;
