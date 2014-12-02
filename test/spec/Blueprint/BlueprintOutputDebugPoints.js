// TODO: Flesh out with more tests
describe("VIZI.BlueprintOutputDebugPoints", function() {
  var config;
  var output;
  var world;

  before(function() {
    world = new VIZI.World({
      viewport: document.createElement("div"),
      camera: new VIZI.Camera({
        aspect: 1024 / 768
      }),
      renderer : { headless: !ViziTestsWebGLSupported }
    });

    config = {
      type: "BlueprintOutputDebugPoints",
      options: {}
    };

    output = new VIZI.BlueprintOutputDebugPoints(config);
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintOutputDebugPoints).to.exist;
  });

  it("has a triggers property with correct triggers", function() {
    expect(output.triggers).to.exist;
    expect(output.triggers[0].name).to.equal("initialised");
  });

  it("has an actions property with correct actions", function() {
    expect(output.actions).to.exist;
    expect(output.actions[0].name).to.equal("outputPoints");
  });

  it("has an undefined world property", function() {
    expect(output.world).to.be.undefined;
  });

  it("has an init method", function() {
    expect(output.init).to.exist;
  });

  it("has an outputPoints method", function() {
    expect(output.outputPoints).to.exist;
  });

  it("has an onAdd method", function() {
    expect(output.onAdd).to.exist;
  });

  it("can initialise when added to world", function() {
    var spy = new sinon.spy(output, "init");

    output.onAdd(world);
    
    expect(output.world).to.equal(world);
    expect(spy).to.have.been.called;

    output.init.restore();
    spy = undefined;
  });

  it("can emit event on initialisation", function() {
    var spy = new sinon.spy();
    output.on("initialised", spy);

    output.onAdd(world);

    expect(spy).to.have.been.called;

    spy = undefined;
  });
});