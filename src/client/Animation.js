/* globals window, _, VIZI */
(function() {
  "use strict";

  // Animation methods and logic
  VIZI.Animation = (function() {
    // Easing formulas based on:
    // http://joshondesign.com/2013/03/01/improvedEasingEquations
    var easing = {
      cubicIn: function(t) {
        return Math.pow(t,3);
      },
      cubicInOut: function(t) {
        if(t < 0.5) return easing.cubicIn(t*2.0)/2.0;
        return 1-easing.cubicIn((1-t)*2)/2;                
      }
    };

    return {
      easing: easing
    };
  }());
}());