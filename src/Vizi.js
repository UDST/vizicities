/* globals window */

/**
 * Namespace for ViziCities
 * @author Robin Hawkes - vizicities.com
 */

// Hack to give worker access to VIZI global
if (typeof window === undefined) {
  var VIZI;
}

(function() {
  "use strict";

  var _VIZI = {
    VERSION: "0.2.0",
    DEBUG: false
  };

  // Output ASCII logo
  console.log("═════════════════════════════════════════════════════════════");
  console.log("██╗   ██╗██╗███████╗██╗ ██████╗██╗████████╗██╗███████╗███████╗");
  console.log("██║   ██║██║╚══███╔╝██║██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝");
  console.log("██║   ██║██║  ███╔╝ ██║██║     ██║   ██║   ██║█████╗  ███████╗");
  console.log("╚██╗ ██╔╝██║ ███╔╝  ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║");
  console.log(" ╚████╔╝ ██║███████╗██║╚██████╗██║   ██║   ██║███████╗███████║");
  console.log("  ╚═══╝  ╚═╝╚══════╝╚═╝ ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝");
  console.log("═══════════════════════════ " + _VIZI.VERSION + " ═══════════════════════════");

  // List any constants or helper functions here, like:
  // https://github.com/mrdoob/three.js/blob/master/src/Three.js

  // Hack to give worker access to VIZI global
  if (typeof window === undefined) {
    // Expose VIZI to the window
    window.VIZI = _VIZI;
  } else {
    VIZI = _VIZI;
  }
}());