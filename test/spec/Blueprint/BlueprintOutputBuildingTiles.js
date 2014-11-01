// TODO: Flesh out with more tests
describe("VIZI.BlueprintOutputBuildingTiles", function() {
  var config;
  var output;
  var world;

  before(function() {
    world = new VIZI.World({
      viewport: document.createElement("div"),
      camera: new VIZI.Camera({
        aspect: 1024 / 768
      })
    });

    config = {
      type: "BlueprintOutputBuildingTiles",
      options: {
        grids: [{
          zoom: 15,
          tilesPerDirection: 1,
          cullZoom: 12
        }]
      }
    };

    output = new VIZI.BlueprintOutputBuildingTiles(config);
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintOutputBuildingTiles).to.exist;
  });

  it("has a triggers property with correct triggers", function() {
    expect(output.triggers).to.exist;
    expect(output.triggers[0].name).to.equal("initialised");
    expect(output.triggers[1].name).to.equal("gridUpdated");
  });

  it("has an actions property with correct actions", function() {
    expect(output.actions).to.exist;
    expect(output.actions[0].name).to.equal("outputBuildingTile");
  });

  it("has a grids property", function() {
    expect(output.grids).to.exist;
  });

  it("has an undefined world property", function() {
    expect(output.world).to.be.undefined;
  });

  it("has an undefined worker property", function() {
    expect(output.worker).to.be.undefined;
  });

  it("has an init method", function() {
    expect(output.init).to.exist;
  });

  it("has a createGrid method", function() {
    expect(output.createGrid).to.exist;
  });

  it("has an outputBuildingTile method", function() {
    expect(output.outputBuildingTile).to.exist;
  });

  it("has an outputBuildingTileWorker method", function() {
    expect(output.outputBuildingTileWorker).to.exist;
  });

  it("has an onAdd method", function() {
    expect(output.onAdd).to.exist;
  });

  // TODO: Disabled for now as the worker script in init() fails to load
  // it("can initialise when added to world", function() {
  //   var spy = new sinon.spy(output, "init");

  //   output.onAdd(world);
    
  //   expect(output.world).to.equal(world);
  //   expect(spy).to.have.been.called;
  // });
  
  // TODO: Disabled for now as the worker script in init() fails to load
  // it("can emit event on initialisation", function() {
  //   var spy = new sinon.spy();
  //   output.on("initialised", spy);

  //   output.onAdd(world);

  //   expect(spy).to.have.been.called;
  // });
});