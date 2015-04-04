/* globals window, _, VIZI, d3, JXON */
(function() {
  "use strict";

/**
 * Blueprint KML input
 * @author Robin Hawkes - vizicities.com
 */  

  // input: {
  //   type: "BlueprintInputKML",
  //   options: {
  //     path: "/data/tower-hamlets.kml"
  //   }
  // }
  VIZI.BlueprintInputKML = function(options) {
    var self = this;

    VIZI.BlueprintInput.call(self, options);

    _.defaults(self.options, {});

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: []},
      {name: "dataReceived", arguments: ["kml"]}
    ];

    self.actions = [
      {name: "requestData", arguments: []}
    ];
  };

  VIZI.BlueprintInputKML.prototype = Object.create( VIZI.BlueprintInput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintInputKML.prototype.init = function() {
    var self = this;
    self.emit("initialised");
  };

  // TODO: Cache a certain amount of tiles
  // TODO: Pull from cache if available
  VIZI.BlueprintInputKML.prototype.requestData = function(tiles) {
    var self = this;

    if (!self.options.path) {
      throw new Error("Required path option missing");
    }

    // Request data
    d3.xml(self.options.path, function(error, data) {
      if (error) {
        if (self.options.debug) console.log("Failed to request KML data");
        console.warn(error);
        return;
      }

      // Process KML into a JSON format
      var jxon = JXON.build(data.querySelector("kml"));

      // Process coordinates
      self.processCoordinates(jxon);
      
      self.emit("dataReceived", jxon);
    });
  };

  // Process coordinates from KML string "lon,lat,alt" into an expected array [lon, lat, alt]
  // https://developers.google.com/kml/documentation/kmlreference
  // TODO: Handle multi-line coordinates (eg. the Polygon type)
  VIZI.BlueprintInputKML.prototype.processCoordinates = function(obj) {
    var self = this;

    _.each(obj, function(item, index) {
      if (_.isObject(item)) {
        self.processCoordinates(item);
      } else if (index === "coordinates") {
        obj[index] = item.split(",");
      }
    });
  };
}());
