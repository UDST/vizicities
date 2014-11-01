/* globals window, _, VIZI, THREE */
(function() {
  "use strict";

/**
 * Blueprint debug points output
 * @author Robin Hawkes - vizicities.com
 */  

  // output: {
  //   type: "BlueprintOutputDebugPoints",
  //   options: {}
  // }
  VIZI.BlueprintOutputDebugPoints = function(options) {
    var self = this;

    VIZI.BlueprintOutput.call(self, options);

    _.defaults(self.options, {});

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: []}
    ];

    self.actions = [
      {name: "outputPoints", arguments: ["data"]}
    ];

    self.world;
  };

  VIZI.BlueprintOutputDebugPoints.prototype = Object.create( VIZI.BlueprintOutput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintOutputDebugPoints.prototype.init = function() {
    var self = this;

    self.emit("initialised");
  };

  // {
  //   coordinates: [lon, lat]
  // }
  VIZI.BlueprintOutputDebugPoints.prototype.outputPoints = function(data) {
    var self = this;

    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      // vertexColors: THREE.VertexColors,
      // ambient: 0xffffff,
      // emissive: 0xcccccc,
      shading: THREE.FlatShading
    });

    var barGeom = new THREE.BoxGeometry( 40, 1, 40 );

    // Shift each vertex by half the bar height
    // This means it will scale from the bottom rather than the centre
    var vertices = barGeom.vertices;
    for (var v = 0; v < vertices.length; v++) {
      vertices[v].y += 0.5;
    }

    var combinedGeom = new THREE.Geometry();

    _.each(data, function(point) {
      var coords = point.coordinates;

      var offset = new VIZI.Point();

      var geoCoord = self.world.project(new VIZI.LatLon(coords[1], coords[0]));

      offset.x = -1 * geoCoord.x;
      offset.y = -1 * geoCoord.y;

      // TODO: Get this from options
      var height = 1000;

      var mesh = new THREE.Mesh(barGeom);

      mesh.scale.y = height;

      // Offset
      mesh.position.x = -1 * offset.x;
      mesh.position.z = -1 * offset.y;

      // Flip as they are up-side down
      // mesh.rotation.x = 90 * Math.PI / 180;

      mesh.matrixAutoUpdate && mesh.updateMatrix();
      combinedGeom.merge(mesh.geometry, mesh.matrix);
    });

    // Move merged geom to 0,0 and return offset
    var offset = combinedGeom.center();

    var combinedMesh = new THREE.Mesh(combinedGeom, material);

    // Use previously calculated offset to return merged mesh to correct position
    // This allows frustum culling to work correctly
    combinedMesh.position.x = -1 * offset.x;

    // Removed for scale center to be correct
    // Offset with applyMatrix above
    combinedMesh.position.y = -1 * offset.y;

    combinedMesh.position.z = -1 * offset.z;

    self.add(combinedMesh);
  };

  VIZI.BlueprintOutputDebugPoints.prototype.onAdd = function(world) {
    var self = this;
    self.world = world;
    self.init();
  };
}());