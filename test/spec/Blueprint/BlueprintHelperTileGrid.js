describe("VIZI.BlueprintHelperTileGrid", function() {
  var helper;
  var world;

  before(function() {
    world = new VIZI.World({
      viewport: document.createElement("div"),
      camera: new VIZI.Camera({
        aspect: 1024 / 768
      }),
      suppressRenderer: true
    });

    helper = new VIZI.BlueprintHelperTileGrid(world, {
      zoom: 16,
      tilesPerDirection: 1,
      cullZoom: 14
    });
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintHelperTileGrid).to.exist;
  });

  it("throws error when missing world argument", function() {
    expect(function() { new VIZI.BlueprintHelperTileGrid(); }).to.throw(Error);
  });

  it("has an options property", function() {
    expect(helper.options).to.exist;
  });

  it("has a disable property", function() {
    expect(helper.disable).to.exist;
  });

  it("has a centerTile property that contains a VIZI.Point instance", function() {
    expect(helper.centerTile).to.exist;
    expect(helper.centerTile).to.be.an.instanceOf(VIZI.Point);
  });

  it("has a centerTileLatLon property that contains a VIZI.LatLon instance", function() {
    expect(helper.centerTileLatLon).to.exist;
    expect(helper.centerTileLatLon).to.be.an.instanceOf(VIZI.LatLon);
  });

  it("has a tileZoom property", function() {
    expect(helper.tileZoom).to.exist;
  });

  it("has a cullZoom property", function() {
    expect(helper.cullZoom).to.exist;
  });

  it("has a tilesPerDirection property", function() {
    expect(helper.tilesPerDirection).to.exist;
  });

  it("has an undefined bounds property", function() {
    expect(helper.bounds).to.be.undefined;
  });

  it("has an undefined boundsLatLon property", function() {
    expect(helper.boundsLatLon).to.be.undefined;
  });

  it("has an undefined tileCount property", function() {
    expect(helper.tileCount).to.be.undefined;
  });

  it("has a tiles property", function() {
    expect(helper.tiles).to.exist;
  });

  it("has a gridDiffSinceMouseUp property that contains a VIZI.Point instance", function() {
    expect(helper.gridDiffSinceMouseUp).to.exist;
    expect(helper.gridDiffSinceMouseUp).to.be.an.instanceOf(VIZI.Point);
  });

  it("has an on method", function() {
    expect(helper.on).to.exist;
  });

  it("has an emit method", function() {
    expect(helper.emit).to.exist;
  });

  it("has an init method", function() {
    expect(helper.init).to.exist;
  });

  it("has a collectTiles method", function() {
    expect(helper.collectTiles).to.exist;
  });

  it("has an onWorldUpdate method", function() {
    expect(helper.onWorldUpdate).to.exist;
  });

  it("has an onMouseUp method", function() {
    expect(helper.onMouseUp).to.exist;
  });

  it("has a globalToLocalTiles method", function() {
    expect(helper.globalToLocalTiles).to.exist;
  });

  it("can get boundary of tiles surrounding a tile", function() {
    var tile = new VIZI.Point(helper.centerTile);
    var distance = 2;
    var bounds = helper.getBounds(distance);

    expect(bounds.n).to.equal(tile.y - distance);
    expect(bounds.s).to.equal(tile.y + distance);
    expect(bounds.e).to.equal(tile.x + distance);
    expect(bounds.w).to.equal(tile.x - distance);
  });

  it("can convert tile boundary into WGS84 coordinates", function() {
    var bounds = {n: 21792, e: 32765, s: 21794, w: 32763};
    var zoom = 16;

    var max = helper.world.crs.tileBoundsLatLon(new VIZI.Point(bounds.e, bounds.n), zoom);
    var min = helper.world.crs.tileBoundsLatLon(new VIZI.Point(bounds.w, bounds.s), zoom);

    var boundsLatLon = helper.getBoundsLatLon(bounds);

    expect(boundsLatLon.n).to.equal(max.n);
    expect(boundsLatLon.e).to.equal(max.e);
    expect(boundsLatLon.s).to.equal(min.s);
    expect(boundsLatLon.w).to.equal(min.w);
  });

  // TODO: Make this more robust and actually test something
  it("can create a valid grid on initialisation", function() {
    var oldCenterTile = new VIZI.Point(helper.centerTile);
    var oldCenterTileLatLon = new VIZI.LatLon(helper.centerTileLatLon);
    var oldTileCount = new VIZI.Point(helper.tileCount);

    helper.init();

    var newCenterTile = new VIZI.Point(helper.centerTile);
    var newCenterTileLatLon = new VIZI.LatLon(helper.centerTileLatLon);
    var newTileCount = new VIZI.Point(helper.tileCount);

    expect(newCenterTile.x).to.not.equal(oldCenterTile.x);
    expect(newCenterTile.y).to.not.equal(oldCenterTile.y);

    expect(newCenterTileLatLon.lat).to.not.equal(oldCenterTileLatLon.lat);
    expect(newCenterTileLatLon.lon).to.not.equal(oldCenterTileLatLon.lon);

    expect(newTileCount.x).to.not.equal(oldTileCount.x);
    expect(newTileCount.y).to.not.equal(oldTileCount.y);

    expect(helper.tiles).to.exist;
    expect(helper.tiles.length).to.equal(newTileCount.x * newTileCount.y);
  });

  it("can convert from global tiles to local relative tiles", function() {
    var bounds = helper.bounds;
    var local = helper.globalToLocalTiles(helper.bounds.w + 1, helper.bounds.n + 1);

    expect(local.x).to.equal(1);
    expect(local.y).to.equal(1);
  });

  // TODO: Make more robust
  it("can update tile grid on world update", function() {
    var oldCenterTile = new VIZI.Point(helper.centerTile);
    var oldCenterTileLatLon = new VIZI.LatLon(helper.centerTileLatLon);

    world.center = new VIZI.LatLon(51, 0);
    var zoom = 16;

    helper.onWorldUpdate(world.center, zoom);

    var newCenterTile = new VIZI.Point(helper.centerTile);
    var newCenterTileLatLon = new VIZI.LatLon(helper.centerTileLatLon);

    expect(newCenterTile.x).to.not.equal(oldCenterTile.x);
    expect(newCenterTile.y).to.not.equal(oldCenterTile.y);

    expect(newCenterTileLatLon.lat).to.not.equal(oldCenterTileLatLon.lat);
    expect(newCenterTileLatLon.lon).to.not.equal(oldCenterTileLatLon.lon);

    expect(newCenterTileLatLon.lat).to.equal(world.center.lat);
    expect(newCenterTileLatLon.lon).to.equal(world.center.lon);
  });

  it("can fire event on grid enabled and disabled", function() {
    var spy1 = new sinon.spy();
    helper.on("enabled", spy1);

    var spy2 = new sinon.spy();
    helper.on("disabled", spy2);

    var zoom = 10;
    helper.onWorldUpdate(world.center, zoom);

    expect(spy2).to.have.been.called;

    zoom = 17;
    helper.onWorldUpdate(world.center, zoom);

    expect(spy1).to.have.been.called;

    spy1 = undefined;
    spy2 = undefined;
  });

  it("can fire event on mouse up", function() {
    var spy = new sinon.spy();
    helper.on("moved", spy);

    helper.gridDiffSinceMouseUp.x += 10;
    helper.gridDiffSinceMouseUp.y += 10;

    helper.onMouseUp();

    expect(spy).to.have.been.called;

    spy = undefined;
  });
});