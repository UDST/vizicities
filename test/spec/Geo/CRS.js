describe("VIZI.CRS", function() {
  var crs = VIZI.CRS;

  it("exists in VIZI namespace", function() {
    expect(VIZI.CRS).to.exist;
  });

  it("has an undefined code property", function() {
    expect(crs.code).to.be.undefined;
  });

  it("has a default tileSize of 256", function() {
    expect(crs.tileSize).to.exist;
    expect(crs.tileSize).to.equal(256);
  });

  it("has a latLonToPoint method", function() {
    expect(crs.latLonToPoint).to.exist;
  });

  it("has a pointToLatLon method", function() {
    expect(crs.pointToLatLon).to.exist;
  });

  it("has a tileBoundsLatLon method", function() {
    expect(crs.tileBoundsLatLon).to.exist;
  });

  it("has a tileBoundsPoint method", function() {
    expect(crs.tileBoundsPoint).to.exist;
  });

  it("has a pointToTile method", function() {
    expect(crs.pointToTile).to.exist;
  });

  it("has a pointToTileTMS method", function() {
    expect(crs.pointToTileTMS).to.exist;
  });

  it("has a latLonToTile method", function() {
    expect(crs.pointToTile).to.exist;
  });

  it("has a latLonToTileTMS method", function() {
    expect(crs.pointToTileTMS).to.exist;
  });

  it("has a tileToLatLon method", function() {
    expect(crs.tileToLatLon).to.exist;
  });

  it("has a convertTile method", function() {
    expect(crs.convertTile).to.exist;
  });

  it("has a project method", function() {
    expect(crs.project).to.exist;
  });

  it("has an unproject method", function() {
    expect(crs.unproject).to.exist;
  });

  it("has a resolution method", function() {
    expect(crs.resolution).to.exist;
  });

  it("has a distance method", function() {
    expect(crs.distance).to.exist;
  });

  it("has a metersPerDegree method", function() {
    expect(crs.metersPerDegree).to.exist;
  });

  it("has a pixelsPerDegree method", function() {
    expect(crs.pixelsPerDegree).to.exist;
  });

  it("has a pixelsPerMeter method", function() {
    expect(crs.pixelsPerMeter).to.exist;
  });

  it("has a altitudeToZoom method", function() {
    expect(crs.altitudeToZoom).to.exist;
  });
});