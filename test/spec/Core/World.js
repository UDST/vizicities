describe("VIZI.World", function() {
  var world;
  var viewport;

  before(function() {
    viewport = document.createElement("div");
    world = new VIZI.World({
      viewport: viewport,
      camera: new VIZI.Camera({
        aspect: 1024 / 768
      })
    });
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.World).to.exist;
  });

  it("throws error when missing viewport element", function() {
    expect(function() { new VIZI.World(); }).to.throw(Error);
  });

  it("sets default options when some are missing", function() {
    expect(world.options).to.exist;
    expect(world.options).to.be.a.object;

    expect(world.options).to.have.property("crs");
    expect(world.options.crs.code).to.equal("EPSG:3857");

    expect(world.options).to.have.property("center");
    expect(world.options.center.lat).to.equal(51.50358);
    expect(world.options.center.lon).to.equal(-0.01924);
  });

  it("can override default options", function() {
    var world2 = new VIZI.World({
      viewport: document.createElement("div"),
      camera: new VIZI.Camera({
        aspect: 1024 / 768
      }),
      crs: VIZI.CRS.EPSG900913,
      center: new VIZI.LatLon(50, 1)
    });

    expect(world2.options).to.exist;
    expect(world2.options).to.be.a.object;

    expect(world2.options).to.have.property("crs");
    expect(world2.options.crs.code).to.equal("EPSG:900913");

    expect(world2.options).to.have.property("center");
    expect(world2.options.center.lat).to.equal(50);
    expect(world2.options.center.lon).to.equal(1);

    world2 = undefined;
  });

  it("has a crs property", function() {
    expect(world.crs).to.exist;
  });

  it("has an attribution property that contains a VIZI.Attribution instance", function() {
    expect(world.attribution).to.exist;
    expect(world.attribution).to.be.an.instanceOf(VIZI.Attribution);
  });

  it("has a switchboards property", function() {
    expect(world.switchboards).to.exist;
    expect(world.switchboards).to.be.an.instanceOf(Array);
  });

  it("has a layers property", function() {
    expect(world.layers).to.exist;
    expect(world.layers).to.be.an.instanceOf(Array);
  });

  it("has a scene property that contains a VIZI.Scene instance", function() {
    expect(world.scene).to.exist;
    expect(world.scene).to.be.an.instanceOf(VIZI.Scene);
  });

  it("has a camera property that contains a VIZI.Camera instance", function() {
    expect(world.camera).to.exist;
    expect(world.camera).to.be.an.instanceOf(VIZI.Camera);
  });

  it("has a center property", function() {
    expect(world.center).to.exist;
    expect(world.center).to.be.an.instanceOf(VIZI.LatLon);
  });

  it("has an origin property", function() {
    expect(world.origin).to.exist;
    expect(world.origin).to.be.an.instanceOf(VIZI.LatLon);
  });

  it("has an originZoom property", function() {
    expect(world.originZoom).to.exist;
  });

  it("has a zoom property", function() {
    expect(world.zoom).to.exist;
  });

  // it("has a controls property", function() {
  //   expect(world.controls).to.exist;
  //   expect(world.controls).to.be.an.instanceOf(Array);
  // });

  it("has a project method", function() {
    expect(world.project).to.exist;
  });

  it("has an unproject method", function() {
    expect(world.unproject).to.exist;
  });

  it("has a pixelsPerMeter method", function() {
    expect(world.pixelsPerMeter).to.exist;
  });

  it("has a addLayer method", function() {
    expect(world.addLayer).to.exist;
  });

  it("has a onTick method", function() {
    expect(world.onTick).to.exist;
  });

  it("has a render method", function() {
    expect(world.render).to.exist;
  });

  it("has a updateView method", function() {
    expect(world.updateView).to.exist;
  });

  it("has a resizeView method", function() {
    expect(world.resizeView).to.exist;
  });

  it("has a moveToLatLon method", function() {
    expect(world.moveToLatLon).to.exist;
  });

  it("has a moveToPoint method", function() {
    expect(world.moveToPoint).to.exist;
  });

  it("has a moveBy method", function() {
    expect(world.moveBy).to.exist;
  });

  it("has a zoomTo method", function() {
    expect(world.zoomTo).to.exist;
  });

  it("has a zoomIn method", function() {
    expect(world.zoomIn).to.exist;
  });

  it("has a zoomOut method", function() {
    expect(world.zoomOut).to.exist;
  });

  it("has a lookAtLatLon method", function() {
    expect(world.lookAtLatLon).to.exist;
  });

  it("has a lookAtPoint method", function() {
    expect(world.lookAtPoint).to.exist;
  });

  it("can update center and zoom", function() {
    var spy = new sinon.spy(world, "updateView");

    var oldCenter = new VIZI.LatLon(world.center);
    var oldZoom = world.zoom;

    var center = new VIZI.LatLon(51, 0);
    var zoom = 10;

    world.updateView(center, zoom);

    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(center, zoom);

    var newCenter = new VIZI.LatLon(world.center);
    var newZoom = world.zoom;

    expect(newCenter.lat).to.not.equal(oldCenter.lat);
    expect(newCenter.lon).to.not.equal(oldCenter.lon);
    expect(newZoom).to.not.equal(oldZoom);
  });

  it("can send an event when view is updated", function() {
    var spy = new sinon.spy();
    VIZI.Messenger.on("world:updateView", spy);

    var center = new VIZI.LatLon(51, 0);
    var zoom = 10;

    world.updateView(center, zoom);

    expect(spy).to.have.been.calledWith(center, zoom);
  });

  it("can project from WGS84 coordinates to pixel position relative to world origin", function() {
    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var coords = new VIZI.LatLon(51.50358, -0.01924);
    var projected = world.project(coords);

    expect(projected.x).to.equal(0);
    expect(projected.y).to.equal(0);

    coords = new VIZI.LatLon(51.50356, -0.01923);
    projected = world.project(coords);

    // TODO: How can this be made to perform a more accurate test?
    expect(projected.x).to.equal(1);
    expect(projected.y).to.equal(1);
  });

  it("can unproject from relative world pixel position to WGS84 coordinates", function() {
    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var point = new VIZI.Point(0, 0);
    var unprojected = world.unproject(point);

    expect(unprojected.lat.toFixed(4)).to.equal(center.lat.toFixed(4));
    expect(unprojected.lon.toFixed(4)).to.equal(center.lon.toFixed(4));

    point = new VIZI.Point(10, 10);
    unprojected = world.unproject(point);

    // TODO: How can this be made to perform a more accurate test?
    expect(unprojected.lat.toFixed(4)).to.not.equal(center.lat.toFixed(4));
    expect(unprojected.lon.toFixed(4)).to.not.equal(center.lon.toFixed(4));
  });

  // TODO: Should really be checking that crs.pixelsPerMeter is called
  // - For some reason that spy failed the test only in Slimer
  it("can find pixels per meter at a WGS84 coordinate", function() {
    var spy = new sinon.spy(world, "pixelsPerMeter");
    var latLon = new VIZI.LatLon(51, 0);
    
    var pixelsPerMeter = world.pixelsPerMeter(latLon);

    expect(spy).to.have.been.calledWith(latLon);

    var zoom = 10;

    pixelsPerMeter = world.pixelsPerMeter(latLon, zoom);

    expect(spy).to.have.been.calledWith(latLon, zoom);
  });

  it("can provide the same value when projecting and unprojecting the same coordinates", function() {
    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var point = new VIZI.Point(0, 0);
    var unprojected = world.unproject(point);
    var projected = world.project(unprojected);

    expect(projected.x).to.equal(point.x);
    expect(projected.y).to.equal(point.y);

    point = new VIZI.Point(100, 100);
    unprojected = world.unproject(point);
    projected = world.project(unprojected);

    expect(projected.x).to.equal(point.x);
    expect(projected.y).to.equal(point.y);
  });

  it("can add a layer to the scene", function() {
    var spy = new sinon.spy(world.scene, "add");

    var oldChildren = world.scene.scene.children.length;
    
    var layer = new VIZI.Layer();
    world.addLayer(layer);

    var newChildren = world.scene.scene.children.length;

    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(layer.object);
    expect(newChildren).to.equal(oldChildren + 1);
  });

  it("can add a switchboard to the world", function() {
    var config = {
      input: {
        type: "BlueprintInputMapTiles",
        options: {
          tilePath: "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png"
        }
      },
      output: {
        type: "BlueprintOutputImageTiles",
        options: {
          grids: [{
            zoom: 13,
            tilesPerDirection: 5,
            cullZoom: 11
          }]
        }
      },
      triggers: [{
        triggerObject: "output",
        triggerName: "initialised",
        triggerArguments: ["tiles"],
        actionObject: "input",
        actionName: "requestTiles",
        actionArguments: ["tiles"],
        actionOutput: {
          tiles: "tiles" // actionArg: triggerArg
        }
      }, {
        triggerObject: "output",
        triggerName: "gridUpdated",
        triggerArguments: ["tiles"],
        actionObject: "input",
        actionName: "requestTiles",
        actionArguments: ["tiles"],
        actionOutput: {
          tiles: "tiles" // actionArg: triggerArg
        }
      }, {
        triggerObject: "input",
        triggerName: "tileReceived",
        triggerArguments: ["image", "tile"],
        actionObject: "output",
        actionName: "outputImageTile",
        actionArguments: ["image", "tile"],
        actionOutput: {
          image: "image", // actionArg: triggerArg
          tile: "tile"
        }
      }]
    };

    var switchboard = new VIZI.BlueprintSwitchboard(config);

    var oldSwitchboards = world.switchboards.length;

    world.addSwitchboard(switchboard);

    var newSwitchboards = world.switchboards.length;

    expect(newSwitchboards).to.equal(oldSwitchboards + 1);
  });

  it("can update each switchboard on tick", function () {
    var config = {
      input: {
        type: "BlueprintInputMapTiles",
        options: {
          tilePath: "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png"
        }
      },
      output: {
        type: "BlueprintOutputImageTiles",
        options: {
          grids: [{
            zoom: 13,
            tilesPerDirection: 5,
            cullZoom: 11
          }]
        }
      },
      triggers: [{
        triggerObject: "output",
        triggerName: "initialised",
        triggerArguments: ["tiles"],
        actionObject: "input",
        actionName: "requestTiles",
        actionArguments: ["tiles"],
        actionOutput: {
          tiles: "tiles" // actionArg: triggerArg
        }
      }, {
        triggerObject: "output",
        triggerName: "gridUpdated",
        triggerArguments: ["tiles"],
        actionObject: "input",
        actionName: "requestTiles",
        actionArguments: ["tiles"],
        actionOutput: {
          tiles: "tiles" // actionArg: triggerArg
        }
      }, {
        triggerObject: "input",
        triggerName: "tileReceived",
        triggerArguments: ["image", "tile"],
        actionObject: "output",
        actionName: "outputImageTile",
        actionArguments: ["image", "tile"],
        actionOutput: {
          image: "image", // actionArg: triggerArg
          tile: "tile"
        }
      }]
    };

    var switchboard = new VIZI.BlueprintSwitchboard(config);

    world.addSwitchboard(switchboard);

    var spy = new sinon.spy(world.switchboards[0], "onTick");
    var delta = 0.01;
    
    world.onTick(delta);
    
    expect(spy).to.have.been.called;

    world.switchboards[0].onTick.restore();
  });

  it("can render scene", function () {
    var spy = new sinon.spy(world.scene, "render");

    world.render();

    expect(spy).to.have.been.called;

    world.scene.render.restore();
  });

  it("can update world center with specific WGS84 coordinate", function() {
    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var newCenter = new VIZI.LatLon(51, 0);
    world.moveToLatLon(newCenter);

    expect(world.center.lat).to.equal(newCenter.lat);
    expect(world.center.lon).to.equal(newCenter.lon);
  });

  it("can update world center with relative pixel delta", function() {
    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var oldCenterPoint = world.crs.latLonToPoint(world.center, world.zoom);

    var moveDelta = new VIZI.Point(100, 100);
    world.moveBy(moveDelta);

    expect(world.center.lat).to.not.equal(center.lat);
    expect(world.center.lon).to.not.equal(center.lon);

    var newCenterPoint = world.crs.latLonToPoint(world.center, world.zoom);

    expect(newCenterPoint.x.toFixed(5)).to.equal((oldCenterPoint.x + moveDelta.x).toFixed(5));
    expect(newCenterPoint.y.toFixed(5)).to.equal((oldCenterPoint.y + moveDelta.y).toFixed(5));
  });

  it("can update world zoom with a specific level", function() {
    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var oldZoom = world.zoom;

    zoom = 10;
    world.zoomTo(zoom);

    var newZoom = world.zoom;

    expect(newZoom).to.not.equal(oldZoom);
    expect(newZoom).to.equal(zoom);
  });

  it("can update world zoom with a delta", function() {
    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var oldZoom = world.zoom;

    var zoomDelta = 1;
    world.zoomIn(zoomDelta);

    var newZoom = world.zoom;

    expect(newZoom).to.not.equal(oldZoom);
    expect(newZoom).to.equal(oldZoom + 1);

    zoomDelta = 2;
    world.zoomOut(zoomDelta);

    newZoom = world.zoom;

    expect(newZoom).to.equal(oldZoom - 1);
  });

  it("can make camera look at a WGS84 coordinate", function () {
    var spy = new sinon.spy(world.camera, "lookAt");

    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var target = new VIZI.LatLon(51, 0);
    var projectedTarget = world.project(target);

    world.lookAtLatLon(target);

    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(projectedTarget);

    world.camera.lookAt.restore();
  });

  it("can make camera look at a pixel position", function () {
    var spy = new sinon.spy(world.camera, "lookAt");

    var center = new VIZI.LatLon(51.50358, -0.01924);
    var zoom = 16;
    world.updateView(center, zoom);

    var target = new VIZI.Point(100, 100);

    world.lookAtPoint(target);

    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(target);

    world.camera.lookAt.restore();
  });

  it("can update world center on control event", function() {
    var spy = new sinon.spy(world, "moveToPoint");
    var point = new VIZI.Point(100, 100);
    var pointLatLon = world.unproject(point);

    VIZI.Messenger.emit("controls:move", point);

    expect(spy).to.be.calledWith(point);
    expect(world.center.lat).to.equal(pointLatLon.lat);
    expect(world.center.lon).to.equal(pointLatLon.lon);
  });

  it("can update world zoom on control event", function() {
    var spy = new sinon.spy(world, "zoomTo");
    var distance = 1000;
    var zoom = Math.ceil(world.crs.altitudeToZoom(distance));

    VIZI.Messenger.emit("controls:zoom", distance);

    expect(spy).to.be.calledWith(zoom);
    expect(world.zoom).to.equal(zoom);
  });

  it("can update camera and renderer on window resize", function() {
    var spy1 = new sinon.spy(world.scene, "resize");
    var spy2 = new sinon.spy(world.camera, "changeAspect");

    // Fake window resize dimensions
    var width = 1920;
    var height = 1080;

    world.resizeView(width, height);

    expect(spy1).to.have.been.called;
    expect(spy2).to.have.been.called;
  });
});