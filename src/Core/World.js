/* globals window, _, VIZI */

/**
 * Main entry point
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.World = function(options) {
    if (VIZI.DEBUG) console.log("Initialising VIZI.World");

    var self = this;

    self.options = options || {};
    
    _.defaults(self.options, {
      crs    : VIZI.CRS.EPSG3857,
      center : new VIZI.LatLon(51.50358, -0.01924),
      zoom   : 16
    });

    if (!self.options.viewport) {
      throw new Error("Required viewport option missing");
    }

    self.crs = self.options.crs;

    self.attribution = new VIZI.Attribution({
      element: self.options.viewport
    });

    // TODO: Store switchboards and layers in an id-referenced object
    self.switchboards = [];
    self.layers = [];

    self.renderer = (self.options.renderer instanceof VIZI.Renderer ?
      self.options.renderer : new VIZI.Renderer(self.options.renderer));

    self.scene = (self.options.scene instanceof VIZI.Scene ?
      self.options.scene : new VIZI.Scene(self.options.scene));

    self.camera = (self.options.camera instanceof VIZI.Camera ?
      self.options.camera : new VIZI.Camera(self.options.camera));

    // Initialize all core objects
    var initOptions = {
      viewport : self.options.viewport,
      renderer : self.renderer,
      scene    : self.scene,
      camera   : self.camera
    };
    if (typeof self.renderer.init === "function")
      self.renderer.init(initOptions);
    if (typeof self.scene.init === "function")
      self.scene.init(initOptions);
    if (typeof self.camera.init === "function")
      self.camera.init(initOptions);

    self.camera.addToScene(self.scene);

    // Origins are used as a fixed base for position projections
    self.origin = new VIZI.LatLon(self.options.center);
    self.originZoom = self.options.zoom;

    // Zoom and center are a dynamic representation of the current state
    // These don't affect the values returned when projecting positions
    self.zoom = undefined;
    self.center = undefined;

    self.updateView(self.options.center, self.options.zoom);

    // Window resize
    window.addEventListener("resize", function(event) {
      self.resizeView(self.options.viewport.clientWidth, self.options.viewport.clientHeight);
    });

    VIZI.Messenger.on("controls:move", function(point) {
      // TODO: Should be more intelligent about whether this has changed
      self.moveToPoint(point);
    });

    VIZI.Messenger.on("controls:zoom", function(distance) {
      // Convert control zoom pixel distance to map zoom
      // TODO: Work out a way to use meters instead of pixels (or not needed?)
      var zoom = Math.ceil(self.crs.altitudeToZoom(distance));

      // TODO: Should be more intelligent about whether this has changed
      self.zoomTo(zoom);
    });
  };

  VIZI.World.prototype.project = function(latLon, zoom) {
    var self = this;
    zoom = zoom || self.originZoom;

    // TODO: Are there ramifications to rounding the pixels?
    var originPoint = self.crs.latLonToPoint(self.origin, zoom, {round: true});
    var projected = self.crs.latLonToPoint(latLon, zoom, {round: true});

    return projected.subtract(originPoint);
  };

  VIZI.World.prototype.unproject = function(point, zoom) {
    var self = this;
    zoom = zoom || self.originZoom;

    // TODO: Are there ramifications to rounding the pixels?
    var originPoint = self.crs.latLonToPoint(self.origin, zoom, {round: true});

    return self.crs.pointToLatLon(point.add(originPoint), zoom);
  };

  VIZI.World.prototype.pixelsPerMeter = function(latLon, zoom) {
    var self = this;
    zoom = zoom || self.originZoom;
    
    return self.crs.pixelsPerMeter(latLon, zoom);
  };

  VIZI.World.prototype.addLayer = function(layer) {
    var self = this;

    self.layers.push(layer);
    self.scene.add(layer.object);
  };

  VIZI.World.prototype.addSwitchboard = function(switchboard) {
    var self = this;

    self.switchboards.push(switchboard);
  };

  // Update world and blueprint states on each frame
  VIZI.World.prototype.onTick = function(delta) {
    var self = this;

    _.each(self.switchboards, function(switchboard) {
      switchboard.onTick(delta);
    });
  };

  // Render current world state
  VIZI.World.prototype.render = function() {
    var self = this;
    self.renderer.render(self.scene, self.camera);
  };

  // Centralised method to handle variable changes and firing of events
  // TODO: Trigger events as move and zoom progress
  // TODO: Update camera zoom and position
  VIZI.World.prototype.updateView = function(center, zoom) {
    var self = this;

    if (zoom) {
      self.zoom = zoom;
    }

    self.center = center;

    VIZI.Messenger.emit("world:updateView", self.center, self.zoom);
  };

  VIZI.World.prototype.resizeView = function(width, height) {
    var self = this;

    var aspect = width / height;
    self.camera.changeAspect(aspect);

    self.renderer.resize(width, height);
  };

  VIZI.World.prototype.moveToLatLon = function(latLon) {
    var self = this;
    self.updateView(latLon);
  };

  VIZI.World.prototype.moveToPoint = function(point) {
    var self = this;
    // TODO: Are there ramifications to not rounding the pixels?
    var unprojected = self.unproject(point);
    self.updateView(unprojected);
  };

  VIZI.World.prototype.moveBy = function(point) {
    var self = this;
    // TODO: Are there ramifications to not rounding the pixels?
    var centerProjected = self.crs.latLonToPoint(self.center, self.zoom);
    var newPoint = centerProjected.add(point);
    self.updateView(self.crs.pointToLatLon(newPoint, self.zoom));
  };

  VIZI.World.prototype.zoomTo = function(zoom) {
    var self = this;
    self.updateView(self.center, zoom);
  };

  VIZI.World.prototype.zoomIn = function(delta) {
    var self = this;
    self.updateView(self.center, self.zoom + delta);
  };

  VIZI.World.prototype.zoomOut = function(delta) {
    var self = this;
    self.updateView(self.center, self.zoom - delta);
  };

  // TODO: Trigger events as camera change progresses
  VIZI.World.prototype.lookAtLatLon = function(latLon) {
    var self = this;
    var projected = self.project(latLon);
    self.camera.lookAt(projected);
  };

  // TODO: Trigger events as camera change progresses
  VIZI.World.prototype.lookAtPoint = function(point) {
    var self = this;

    self.camera.lookAt(point);
  };
})();