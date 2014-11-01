describe("VIZI.BlueprintInputMapTiles", function() {
  var input;

  before(function() {
    input = new VIZI.BlueprintInputMapTiles();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintInputMapTiles).to.exist;
  });

  it("sets default options when some are missing", function() {
    expect(input.options).to.exist;
    expect(input.options).to.be.a.object;

    expect(input.options).to.have.property("tilePath");
  });

  it("can override default options", function() {
    var path = "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png";
    var input2 = new VIZI.BlueprintInputMapTiles({
      tilePath: path
    });

    expect(input2.options).to.exist;
    expect(input2.options).to.be.a.object;

    expect(input2.options).to.have.property("tilePath");
    expect(input2.options.tilePath).to.equal(path);

    input2 = undefined;
  });

  it("has a requestTiles method", function() {
    expect(input.requestTiles).to.exist;
  });

  it("can request tiles", function() {
    var spy = new sinon.spy(input, "requestTiles");
    var tiles = [{
      x: 32764,
      y: 21793,
      z: 16
    }];

    input.requestTiles(tiles);

    expect(spy).to.have.been.calledWith(tiles);
  });

  // TODO: Find a better way than using setTimeout
  it("can send event after receiving tile", function() {
    var input2 = new VIZI.BlueprintInputMapTiles();
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
      expect(spy.args[0][0].nodeName).to.equal("IMG");
    }, 500);

    input2 = undefined;
  });
});