describe("VIZI.Layer", function() {
  var layer;
  var world;

  before(function() {
    layer = new VIZI.Layer();

    world = new VIZI.World({
      viewport: document.createElement("div"),
      camera: new VIZI.Camera({
        aspect: 1024 / 768
      }),
      renderer : { headless: true }
    });
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.Layer).to.exist;
  });

  it("has an object property that contains a THREE.Object3D instance", function() {
    expect(layer.object).to.exist;
    expect(layer.object).to.be.an.instanceOf(THREE.Object3D);
  });

  it("has an on method", function() {
    expect(layer.on).to.exist;
  });

  it("has an emit method", function() {
    expect(layer.emit).to.exist;
  });

  it("has an addToWorld method", function() {
    expect(layer.addToWorld).to.exist;
  });

  it("has a beforeAdd method", function() {
    expect(layer.beforeAdd).to.exist;
  });

  it("has an onAdd method", function() {
    expect(layer.onAdd).to.exist;
  });

  it("has an add method", function() {
    expect(layer.add).to.exist;
  });

  it("has a remove method", function() {
    expect(layer.remove).to.exist;
  });

  it("has an applyVertexColors method", function() {
    expect(layer.applyVertexColors).to.exist;
  });

  it("can add layer to world", function() {
    var spy = new sinon.spy(world, "addLayer");
    var oldLayerCount = world.layers.length;

    layer.addToWorld(world);

    var newLayerCount = world.layers.length;

    expect(spy).to.have.been.calledWith(layer);
    expect(newLayerCount).to.equal(oldLayerCount + 1);

    world.addLayer.restore();
    spy = undefined;
  });

  it("can add object to layer", function() {
    var spy = new sinon.spy(layer, "add");
    var object = new THREE.Object3D();
    var oldChildrenCount = layer.object.children.length;

    layer.add(object);

    var newChildrenCount = layer.object.children.length;

    expect(spy).to.have.been.calledWith(object);
    expect(newChildrenCount).to.equal(oldChildrenCount + 1);

    layer.add.restore();
    spy = undefined;
  });

  it("can remove object from layer", function() {
    var spy = new sinon.spy(layer, "remove");
    var object = new THREE.Object3D();
    var oldChildrenCount = layer.object.children.length;

    layer.add(object);

    var newChildrenCount = layer.object.children.length;

    expect(newChildrenCount).to.equal(oldChildrenCount + 1);

    layer.remove(object);

    newChildrenCount = layer.object.children.length;

    expect(spy).to.have.been.calledWith(object);
    expect(newChildrenCount).to.equal(oldChildrenCount);

    layer.remove.restore();
    spy = undefined;
  });
});