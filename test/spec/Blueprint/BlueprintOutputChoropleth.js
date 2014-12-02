// TODO: Flesh out with more tests
describe("VIZI.BlueprintOutputChoropleth", function() {
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
      type: "BlueprintOutputChoropleth",
      options: {
        colourRange: ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],
        layer: 100
      }
    };

    output = new VIZI.BlueprintOutputChoropleth(config);
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintOutputChoropleth).to.exist;
  });

  it("has a triggers property with correct triggers", function() {
    expect(output.triggers).to.exist;
    expect(output.triggers[0].name).to.equal("initialised");
  });

  it("has an actions property with correct actions", function() {
    expect(output.actions).to.exist;
    expect(output.actions[0].name).to.equal("outputChoropleth");
  });

  it("has an undefined world property", function() {
    expect(output.world).to.be.undefined;
  });

  it("has an init method", function() {
    expect(output.init).to.exist;
  });

  it("has an outputChoropleth method", function() {
    expect(output.outputChoropleth).to.exist;
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