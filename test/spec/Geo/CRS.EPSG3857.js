describe("VIZI.CRS.EPSG3857", function() {
  var crs = VIZI.CRS.EPSG3857;

  it("has an a code value of EPSG:3857", function() {
    expect(crs.code).to.equal("EPSG:3857");
  });

  it("can project from WGS84 to EPSG:3857", function() {
    var coords = new VIZI.LatLon(0, 0);
    var projectedCoords = crs.project(coords);

    expect(Math.round(projectedCoords[0])).to.equal(0);
    expect(Math.round(projectedCoords[1])).to.equal(0);

    coords = new VIZI.LatLon(51.504014489538584, -0.016307830810546875);
    projectedCoords = crs.project(coords);

    expect(projectedCoords[0].toFixed(2)).to.equal("-1815.38");
    expect(projectedCoords[1].toFixed(2)).to.equal("6710937.00");
  });

  it("can unproject from EPSG:3857 to WGS84", function() {
    var coords = new VIZI.LatLon(0, 0);
    var projectedCoords = crs.project(coords);
    var unprojectedCoords = crs.unproject({x: projectedCoords[0], y: projectedCoords[1]});

    expect(unprojectedCoords[0]).to.equal(coords.lon);
    expect(unprojectedCoords[1]).to.equal(coords.lat);

    coords = new VIZI.LatLon(51.504014489538584, -0.016307830810546875);
    projectedCoords = crs.project(coords);
    unprojectedCoords = crs.unproject({x: projectedCoords[0], y: projectedCoords[1]});

    expect(unprojectedCoords[0].toFixed(10)).to.equal(coords.lon.toFixed(10));
    expect(unprojectedCoords[1].toFixed(10)).to.equal(coords.lat.toFixed(10));
  });

  it("can calculate correct resolution for given zoom", function() {
    var resolution = crs.resolution(16);
    expect(resolution).to.equal(2.388657133911758);

    resolution = crs.resolution(10);
    expect(resolution).to.equal(152.8740565703525);
  });

  it("can project WGS84 coordinates into pixel positions", function() {
    var coords = new VIZI.LatLon(0, 0);
    var zoom = 0;
    var projectedCoords = crs.latLonToPoint(coords, zoom);
    
    expect(projectedCoords.x).to.equal(128);
    expect(projectedCoords.y).to.equal(128);

    coords = new VIZI.LatLon(0, 0);
    zoom = 2;
    projectedCoords = crs.latLonToPoint(coords, zoom);
    
    expect(projectedCoords.x).to.equal(512);
    expect(projectedCoords.y).to.equal(512);

    coords = new VIZI.LatLon(51.504014489538584, -0.016307830810546875);
    zoom = 16;
    projectedCoords = crs.latLonToPoint(coords, zoom, {round: true});
    
    expect(projectedCoords.x).to.equal(8387848);
    expect(projectedCoords.y).to.equal(5579106);
  });

  it("can project pixel positions into WGS84 coordinates", function() {
    var coords = new VIZI.LatLon(0, 0);
    var zoom = 0;
    var projectedPoint = crs.latLonToPoint(coords, zoom);
    var projectedCoords = crs.pointToLatLon(projectedPoint, zoom);
    
    expect(projectedCoords.lat).to.equal(coords.lat);
    expect(projectedCoords.lon).to.equal(coords.lon);

    coords = new VIZI.LatLon(0, 0);
    zoom = 2;
    projectedPoint = crs.latLonToPoint(coords, zoom);
    projectedCoords = crs.pointToLatLon(projectedPoint, zoom);
    
    expect(projectedCoords.lat).to.equal(coords.lat);
    expect(projectedCoords.lon).to.equal(coords.lon);

    coords = {lat: 51.504014489538584, lon: -0.016307830810546875};
    zoom = 16;
    projectedPoint = crs.latLonToPoint(coords, zoom);
    projectedCoords = crs.pointToLatLon(projectedPoint, zoom);
    
    expect(projectedCoords.lat.toFixed(10)).to.equal(coords.lat.toFixed(10));
    expect(projectedCoords.lon.toFixed(10)).to.equal(coords.lon.toFixed(10));
  });

  it("can convert pixel positions into Google tiles", function() {
    var point = new VIZI.Point(128, 128);
    var tile = crs.pointToTile(point);

    expect(tile.x).to.equal(0);
    expect(tile.y).to.equal(0);

    point = new VIZI.Point(400, 400);
    tile = crs.pointToTile(point);

    expect(tile.x).to.equal(1);
    expect(tile.y).to.equal(1);

    point = new VIZI.Point(8387848, 5579106);
    tile = crs.pointToTile(point);

    expect(tile.x).to.equal(32765);
    expect(tile.y).to.equal(21793);
  });

  it("can convert pixel positions into TMS tiles", function() {
    var point = new VIZI.Point(128, 128);
    var zoom = 0;
    var tile = crs.pointToTileTMS(point, zoom);

    expect(tile.x).to.equal(0);
    expect(tile.y).to.equal(0);

    point = new VIZI.Point(400, 400);
    zoom = 1;
    tile = crs.pointToTileTMS(point, zoom);

    expect(tile.x).to.equal(1);
    expect(tile.y).to.equal(0);

    point = new VIZI.Point(8387848, 5579106);
    zoom = 16;
    tile = crs.pointToTileTMS(point, zoom);

    expect(tile.x).to.equal(32765);
    expect(tile.y).to.equal(43742);
  });

  it("can convert WGS84 coordinates into Google tiles", function() {
    var latLon = new VIZI.LatLon(0, 0);
    var zoom = 0;
    var tile = crs.latLonToTile(latLon, zoom);

    expect(tile.x).to.equal(0);
    expect(tile.y).to.equal(0);

    latLon = new VIZI.LatLon(0, 0);
    zoom = 1;
    tile = crs.latLonToTile(latLon, zoom);

    expect(tile.x).to.equal(0);
    expect(tile.y).to.equal(0);

    latLon = new VIZI.LatLon(51.504014489538584, -0.016307830810546875);
    zoom = 16;
    tile = crs.latLonToTile(latLon, zoom);

    expect(tile.x).to.equal(32765);
    expect(tile.y).to.equal(21793);
  });

  it("can convert WGS84 coordinates into TMS tiles", function() {
    var latLon = new VIZI.LatLon(0, 0);
    var zoom = 0;
    var tile = crs.latLonToTileTMS(latLon, zoom);

    expect(tile.x).to.equal(0);
    expect(tile.y).to.equal(0);

    latLon = new VIZI.LatLon(0, 0);
    zoom = 1;
    tile = crs.latLonToTileTMS(latLon, zoom);

    expect(tile.x).to.equal(0);
    expect(tile.y).to.equal(0);

    latLon = new VIZI.LatLon(51.504014489538584, -0.016307830810546875);
    zoom = 16;
    tile = crs.latLonToTileTMS(latLon, zoom);

    expect(tile.x).to.equal(32765);
    expect(tile.y).to.equal(43742);
  });

  it("can convert Google tiles into TMS tiles", function() {
    var tile = new VIZI.Point(0, 0);
    var zoom = 0;
    var tileTMS = crs.convertTile(tile, zoom);

    expect(tileTMS.x).to.equal(0);
    expect(tileTMS.y).to.equal(0);

    tile = new VIZI.Point(0, 0);
    zoom = 1;
    tileTMS = crs.convertTile(tile, zoom);

    expect(tileTMS.x).to.equal(0);
    expect(tileTMS.y).to.equal(1);

    tile = new VIZI.Point(32765, 21793);
    zoom = 16;
    tileTMS = crs.convertTile(tile, zoom);

    expect(tileTMS.x).to.equal(32765);
    expect(tileTMS.y).to.equal(43742);
  });

  it("can convert TMS tiles into Google tiles", function() {
    var tileTMS = new VIZI.Point(0, 0);
    var zoom = 0;
    var tile = crs.convertTile(tileTMS, zoom);

    expect(tile.x).to.equal(0);
    expect(tile.y).to.equal(0);

    tileTMS = new VIZI.Point(0, 1);
    zoom = 1;
    tile = crs.convertTile(tileTMS, zoom);

    expect(tile.x).to.equal(0);
    expect(tile.y).to.equal(0);

    tileTMS = new VIZI.Point(32765, 43742);
    zoom = 16;
    tile = crs.convertTile(tileTMS, zoom);

    expect(tile.x).to.equal(32765);
    expect(tile.y).to.equal(21793);
  });

  it("can convert tiles into WGS84 coordinate bounds", function() {
    var tile = new VIZI.Point(32764, 21793);
    var zoom = 16;
    var bounds = crs.tileBoundsLatLon(tile, zoom);

    var correctBounds = {
      n: 51.50532341149335,
      e: -0.0164794921875,
      s: 51.50190410761811,
      w: -0.02197265625
    };

    expect(bounds.n.toFixed(10)).to.equal(correctBounds.n.toFixed(10));
    expect(bounds.e.toFixed(10)).to.equal(correctBounds.e.toFixed(10));
    expect(bounds.s.toFixed(10)).to.equal(correctBounds.s.toFixed(10));
    expect(bounds.w.toFixed(10)).to.equal(correctBounds.w.toFixed(10));
  });

  it("can convert tiles into pixel position bounds", function() {
    var tile = new VIZI.Point(32764, 21793);
    var zoom = 16;
    var bounds = crs.tileBoundsPoint(tile, zoom);

    var correctBounds = {
      n: 5579008,
      e: 8387840,
      s: 5579264,
      w: 8387584
    };

    expect(bounds.n).to.equal(correctBounds.n);
    expect(bounds.e).to.equal(correctBounds.e);
    expect(bounds.s).to.equal(correctBounds.s);
    expect(bounds.w).to.equal(correctBounds.w);
  });

  it("can convert tiles into WGS84 coordinate center", function() {
    var tile = new VIZI.Point(32764, 21793);
    var zoom = 16;
    var bounds = crs.tileBoundsLatLon(tile, zoom);
    var center = crs.tileToLatLon(tile, zoom);

    var correctCenter = new VIZI.LatLon(
      bounds.s + (bounds.n - bounds.s) / 2,
      bounds.w + (bounds.e - bounds.w) / 2
    );

    expect(center.lat.toFixed(10)).to.equal(correctCenter.lat.toFixed(10));
    expect(center.lon.toFixed(10)).to.equal(correctCenter.lon.toFixed(10));
  });

  it("can calculate distance in meters between two WGS84 coordinates", function() {
    var latLon1 = new VIZI.LatLon(51.5, -0.01);
    var latLon2 = new VIZI.LatLon(51.51, -0.02);
    var distance = crs.distance(latLon1, latLon2);

    expect(distance.toFixed(2)).to.equal("1311.23");

    var latLon1 = new VIZI.LatLon(51.5, -0.01);
    var latLon2 = new VIZI.LatLon(51.5, -0.0101);
    var distance = crs.distance(latLon1, latLon2);

    expect(distance.toFixed(2)).to.equal("6.93");
  });

  it("can calculate length of a degree in meters at a WGS84 coordinate", function() {
    var latLon = new VIZI.LatLon(51, 0);
    var expected = new VIZI.Point(70197.65060613726, 111248.23835493479);
    var distance = crs.metersPerDegree(latLon);

    expect(distance.x.toFixed(5)).to.equal(expected.x.toFixed(5));
    expect(distance.y.toFixed(5)).to.equal(expected.y.toFixed(5));
  });

  it("can calculate length of a degree in pixels at a WGS84 coordinate", function() {
    var latLon = new VIZI.LatLon(51, 0);
    var zoom = 16;
    var expected = new VIZI.Point(46603.37777777761, 74867.0577783063);
    var distance = crs.pixelsPerDegree(latLon, zoom);

    expect(distance.x.toFixed(5)).to.equal(expected.x.toFixed(5));
    expect(distance.y.toFixed(5)).to.equal(expected.y.toFixed(5));
  });

  it("can calculate pixels per meter at a WGS84 coordinate", function() {
    var latLon = new VIZI.LatLon(51, 0);
    var zoom = 16;
    var expected = new VIZI.Point(0.6638879987488236, 0.672972973643365);
    var pixelsPerMeter = crs.pixelsPerMeter(latLon, zoom);

    expect(pixelsPerMeter.x.toFixed(5)).to.equal(expected.x.toFixed(5));
    expect(pixelsPerMeter.y.toFixed(5)).to.equal(expected.y.toFixed(5));
  });

  // TODO: There has to be a better way to test this
  it("can calculate map zoom from altitude in meters", function() {
    var minZoom = 0;
    var maxZoom = 20;

    var altitude = 0;
    var zoom = crs.altitudeToZoom(altitude);

    expect(zoom).to.equal(maxZoom);

    altitude = 10490000;
    zoom = crs.altitudeToZoom(altitude);

    expect(zoom).to.equal(minZoom);
  })
});