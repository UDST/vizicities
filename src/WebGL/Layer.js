/* globals window, _, VIZI, THREE */

/**
 * 3D layer
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Layer = function() {
    if (VIZI.DEBUG) console.log("Initialising VIZI.Layer");

    var self = this;

    VIZI.EventEmitter.call(self);

    self.object = new THREE.Object3D();
  };

  VIZI.Layer.prototype = Object.create( VIZI.EventEmitter.prototype );

  VIZI.Layer.prototype.addToWorld = function(world) {
    var self = this;
    self.beforeAdd(world);
    world.addLayer(self);
    self.onAdd(world);
  };

  VIZI.Layer.prototype.beforeAdd = function(world) {};
  VIZI.Layer.prototype.onAdd = function(world) {};

  VIZI.Layer.prototype.add = function(object) {
    var self = this;
    self.object.add(object);
  };

  VIZI.Layer.prototype.remove = function(object) {
    var self = this;
    self.object.remove(object);
  };

  VIZI.Layer.prototype.applyVertexColors = function( geom, colour ) {
    geom.faces.forEach( function( f ) {
      var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
      for( var j = 0; j < n; j ++ ) {
        f.vertexColors[ j ] = colour;
      }
    } );
  };
})();