/* globals window, _, VIZI */
(function() {
  "use strict";

/**
 * Blueprint map tiles input
 * @author Robin Hawkes - vizicities.com
 */  

  // input: {
  //   type: "BlueprintInputMapTiles",
  //   options: {
  //     tilePath: "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png"
  //   }
  // }

  var tileURLRegex = /\{([zxy])\}/g;

  VIZI.BlueprintInputMapTiles = function(options) {
    var self = this;

    VIZI.BlueprintInput.call(self, options);

    _.defaults(self.options, {
      tilePath: "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png"
    });

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: []},
      {name: "tileReceived", arguments: ["image", "tile"]}
    ];

    self.actions = [{name: "requestTiles", arguments: ["tiles"]}];
  };

  VIZI.BlueprintInputMapTiles.prototype = Object.create( VIZI.BlueprintInput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintInputMapTiles.prototype.init = function() {
    var self = this;
    self.emit("initialised");
  };

  // [{
  //   x: 262116,
  //   y: 174348,
  //   z: 19
  // }, ...]

  // TODO: Pull from cache if available
  // TODO: Cache a certain amount of tiles
  VIZI.BlueprintInputMapTiles.prototype.requestTiles = function(tiles) {
    var self = this;

    if (self.options.debug) console.log("Requesting tiles", tiles);

    _.each(tiles, function(tile, key) {
      tileURLRegex.lastIndex = 0;
      var url = self.options.tilePath.replace(tileURLRegex, function(value, key) {
        // Replace with paramter, otherwise keep existing value
        return tile[key];
      });

      var img = new Image();

      img.onload = function() {
        self.emit("tileReceived", img, tile);
        img = undefined;
      };

      img.crossOrigin = "Anonymous";
      img.src = url;
    });
  };
}());
