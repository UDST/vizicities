describe("VIZI.LatLon", function() {
  it("exists in VIZI namespace", function() {
    expect(VIZI.LatLon).to.exist;
  });

  it("sets default values when none are passed in", function() {
    var coords = new VIZI.LatLon();

    expect(coords.lat).to.equal(0);
    expect(coords.lon).to.equal(0);
    expect(coords.alt).to.equal(0);
  });

  it("can understand values as arguments", function() {
    var coords = new VIZI.LatLon(51, 0);

    expect(coords.lat).to.equal(51);
    expect(coords.lon).to.equal(0);
    expect(coords.alt).to.equal(0);

    coords = new VIZI.LatLon(51, 0, 10);

    expect(coords.lat).to.equal(51);
    expect(coords.lon).to.equal(0);
    expect(coords.alt).to.equal(10);
  });

  it("can understand values as an array", function() {
    var coords = new VIZI.LatLon([51, 0]);

    expect(coords.lat).to.equal(51);
    expect(coords.lon).to.equal(0);
    expect(coords.alt).to.equal(0);

    coords = new VIZI.LatLon([51, 0, 10]);

    expect(coords.lat).to.equal(51);
    expect(coords.lon).to.equal(0);
    expect(coords.alt).to.equal(10);
  });

  it("can understand values as a VIZI.LatLon object", function() {
    var coords = new VIZI.LatLon(new VIZI.LatLon(51, 0));

    expect(coords.lat).to.equal(51);
    expect(coords.lon).to.equal(0);
    expect(coords.alt).to.equal(0);

    coords = new VIZI.LatLon(new VIZI.LatLon(51, 0, 10));

    expect(coords.lat).to.equal(51);
    expect(coords.lon).to.equal(0);
    expect(coords.alt).to.equal(10);
  });
});