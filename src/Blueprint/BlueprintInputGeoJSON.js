/* globals window, _, VIZI, d3 */
(function() {
  "use strict";

/**
 * Blueprint GeoJSON input
 * @author Robin Hawkes - vizicities.com
 */  

  // input: {
  //   type: "BlueprintInputGeoJSON",
  //   options: {
  //     path: "/data/tower-hamlets-lsoa-census.geojson"
  //     // tilePath: "http://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.json"
  //   }
  // }
  VIZI.BlueprintInputGeoJSON = function(options) {
    var self = this;

    VIZI.BlueprintInput.call(self, options);

    _.defaults(self.options, {});

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: []},
      {name: "dataReceived", arguments: ["geoJSON"]},
      {name: "tileReceived", arguments: ["geoJSON", "tile"]}
    ];

    self.actions = [
      {name: "requestData", arguments: []},
      {name: "requestTiles", arguments: ["tiles"]}
    ];
  };

  VIZI.BlueprintInputGeoJSON.prototype = Object.create( VIZI.BlueprintInput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintInputGeoJSON.prototype.init = function() {
    var self = this;
    self.emit("initialised");
  };

  // TODO: Pull from cache if available
  VIZI.BlueprintInputGeoJSON.prototype.requestData = function() {
    var self = this;

    if (!self.options.path) {
      throw new Error("Required path option missing");
    }

    // Request data
    d3.json(self.options.path, function(error, data) {
      if (error) {
        if (VIZI.DEBUG) console.log("Failed to request GeoJSON data");
        console.warn(error);
        return;
      }
      
      self.emit("dataReceived", data);
    });
  };

  // [{
  //   x: 262116,
  //   y: 174348,
  //   z: 19
  // }, ...]

  // TODO: Cache a certain amount of tiles
  // TODO: Pull from cache if available
  VIZI.BlueprintInputGeoJSON.prototype.requestTiles = function(tiles) {
    var self = this;

    if (!self.options.tilePath) {
      throw new Error("Required tile path option missing");
    }
    
    if (VIZI.DEBUG) console.log("Requesting tiles", tiles);

    _.each(tiles, function(tile, key) {
      var url = self.options.tilePath.replace(/\{([zxy])\}/g, function(value, key) {
        // Replace with paramter, otherwise keep existing value
        return tile[key];
      });

      // Request tile data
      d3.json(url, function(error, data) {
        if (error) {
          if (VIZI.DEBUG) console.log("Failed to request GeoJSON data");
          console.warn(error);
          return;
        }

        //filter out unwanted (e.g. manually modeled) buildings
        if (self.options.omitBuildings) {
          var omitBuildings = self.options.omitBuildings;
          data.features = _.reject(data.features, function(feature) {
            return _.contains(omitBuildings, feature.id);
          });  
        }
          
        self.emit("tileReceived", data, tile);
      });
    });
  };
}());
