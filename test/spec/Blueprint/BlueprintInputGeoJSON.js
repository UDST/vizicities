describe("VIZI.BlueprintInputGeoJSON", function() {
  var input;

  before(function() {
    input = new VIZI.BlueprintInputGeoJSON();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintInputGeoJSON).to.exist;
  });

  it("has a requestData method", function() {
    expect(input.requestData).to.exist;
  });

  it("has a requestTiles method", function() {
    expect(input.requestTiles).to.exist;
  });

  it("can request data", function() {
    var input2 = new VIZI.BlueprintInputGeoJSON({
      path: "http://vector.mapzen.com/osm/buildings/16/32764/21793.json"
    });

    var spy = new sinon.spy(input2, "requestData");

    input2.requestData();

    expect(spy).to.have.been.called;

    input2 = undefined;
  });

  it("can send event after receiving data", function() {
    var input2 = new VIZI.BlueprintInputGeoJSON({
      path: "http://vector.mapzen.com/osm/buildings/16/32764/21793.json"
    });

    var spy = sinon.spy();

    input2.on("dataReceived", spy);
    input2.requestData();

    setTimeout(function() {
      expect(spy).to.have.been.called;
      expect(spy.args[0].length).to.equal(1);
    }, 500);

    input2 = undefined;
  });

  it("can request tiles", function() {
    var input2 = new VIZI.BlueprintInputGeoJSON({
      tilePath: "http://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.json"
    });

    var spy = new sinon.spy(input2, "requestTiles");
    var tiles = [{
      x: 32764,
      y: 21793,
      z: 16
    }];

    input2.requestTiles(tiles);

    expect(spy).to.have.been.calledWith(tiles);

    input2 = undefined;
  });

  // TODO: Find a better way than using setTimeout
  it("can send event after receiving tile", function() {
    var input2 = new VIZI.BlueprintInputGeoJSON({
      tilePath: "http://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.json"
    });

    var spy = sinon.spy();
    var tiles = [{
      x: 32764,
      y: 21793,
      z: 16
    }];

    input2.on("tileReceived", spy);
    input2.requestTiles(tiles);

    setTimeout(function() {
      expect(spy).to.have.been.called;
      expect(spy.args[0].length).to.equal(2);
    }, 500);

    input2 = undefined;
  });
});