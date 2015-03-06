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
      crs: VIZI.CRS.EPSG3857,
      center: new VIZI.LatLon(51.50358, -0.01924),
      zoom: 16,
      suppressRenderer: false, // Set true for tests
      layersUI: true,
      picking: false
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

    // Add UI container
    // TODO: Move into a separate UI class
    var uiContainer = document.createElement("div");

    // Styling is adding via vizicities.css
    uiContainer.classList.add("vizicities-ui");
    self.options.viewport.appendChild(uiContainer);

    // Set up layer UI
    if (self.options.layersUI) {
      self.layersUI = new VIZI.LayersUI(self.layers);
    }

    // TODO: Ability to override this with a scene passed into the options
    // TODO: Pass-through options that tweak scene (antialias, etc)
    self.scene = new VIZI.Scene({
      viewport: self.options.viewport,
      // TODO: Remove this when running WebGL tests on Travis is solved
      suppressRenderer: self.options.suppressRenderer,
      picking: self.options.picking
    });

    self.camera = self.options.camera || new VIZI.Camera({
      aspect: self.options.viewport.clientWidth / self.options.viewport.clientHeight
    });

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

    // Update layers UI
    if (self.layersUI) {
      self.layersUI.onChange();
    }
  };

  VIZI.World.prototype.addPickable = function(mesh, id) {
    var self = this;
    self.scene.addPickable(mesh, id);
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
    self.scene.render(self.camera);
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

    self.scene.resize(width, height);
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

  // From: http://stackoverflow.com/a/27412386/997339
  VIZI.World.prototype.worldPositionTo2D = function(position) {
    var self = this;

    var vector3 = position.clone();

    // Map to normalized device coordinate (NDC) space
    vector3.project(self.camera.camera);

    // Map to 2D screen space
    var position2D = new VIZI.Point();
    position2D.x = Math.round((vector3.x + 1) * self.options.viewport.clientWidth / 2),
    position2D.y = Math.round((-vector3.y + 1) * self.options.viewport.clientHeight / 2);
    
    return position2D;
  };
})();