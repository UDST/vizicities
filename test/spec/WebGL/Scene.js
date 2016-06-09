// TODO: Improve WebGL and DOM testing
describe("VIZI.Scene", function() {
  var scene;
  var viewportDOM;

  before(function() {
    viewportDOM = document.createElement("div")

    scene = new VIZI.Scene({
      viewport: viewportDOM,
      suppressRenderer: true
    });
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.Scene).to.exist;
  });

  it("has a createScene method", function() {
    expect(scene.createScene).to.exist;
  });

  it("has a createRenderer method", function() {
    expect(scene.createRenderer).to.exist;
  });

  it("has an add method", function() {
    expect(scene.add).to.exist;
  });

  it("has a remove method", function() {
    expect(scene.remove).to.exist;
  });

  it("has a render method", function() {
    expect(scene.render).to.exist;
  });

  it("has a resize method", function() {
    expect(scene.resize).to.exist;
  });

  it("throws error when missing viewport element", function() {
    expect(function() { new VIZI.Scene({suppressRenderer: true}); }).to.throw(Error);
  });

  it("sets default options when some are missing", function() {
    expect(scene.options).to.exist;
    expect(scene.options).to.be.a.object;
    expect(scene.options).to.have.property("antialias");
    expect(scene.options).to.have.property("fogColour");
  });

  it("can override default options", function() {
    var override = new VIZI.Scene({
      antialias: true,
      fogColour: 0x000000,
      viewport: document.createElement("div"),
      suppressRenderer: true
    });

    expect(override.options).to.exist;
    expect(override.options).to.be.a.object;
    expect(override.options).to.have.property("antialias");
    expect(override.options).to.have.property("fogColour");

    expect(override.options.antialias).to.equal(true);
    expect(override.options.fogColour).to.equal(0x000000);

    override = undefined;
  });

  it("has a scene property that contains a THREE.Scene instance", function() {
    expect(scene.scene).to.exist;
    expect(scene.scene).to.be.an.instanceof(THREE.Scene);
  });

  // TODO: Causes problems with Travis tests
  // it("has a renderer property that contains a THREE.WebGLRenderer instance", function() {
  //   expect(scene.renderer).to.exist;
  //   expect(scene.renderer).to.be.an.instanceof(THREE.WebGLRenderer);
  // });

  it("can create a renderer and add it to the viewport", function() {
    expect(viewportDOM.children.length).to.equal(1);
    expect(viewportDOM.firstChild.nodeName).to.equal("CANVAS");
  });

  it("can add object to the scene", function() {
    var object = new THREE.Object3D();
    var prevObjectCount = scene.scene.children.length;

    scene.add(object);

    expect(scene.scene.children.length).to.equal(prevObjectCount + 1);
  });

  it("can remove object from the scene", function() {
    var object = new THREE.Object3D();
    var prevObjectCount = scene.scene.children.length;

    scene.add(object);

    expect(scene.scene.children.length).to.equal(prevObjectCount + 1);

    scene.remove(object);

    expect(scene.scene.children.length).to.equal(prevObjectCount);    
  });

  it("throws an error on render when missing a camera", function() {
    expect(function() {scene.render();}).to.throw(Error);
  });

  it("can render when passed a camera", function() {
    var camera = new VIZI.Camera({
      aspect: 1024 / 768
    });

    camera.lookAt(new VIZI.Point());

    var spy = new sinon.spy(scene, "render");

    scene.render(camera);

    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(camera);

    scene.render.restore();
    spy = undefined;
  });

  // TODO: Disabled until WebGL in Slimer can be solved
  // it("can update renderer size", function() {
  //   // Fake window resize dimensions
  //   var width = 1920;
  //   var height = 1080;

  //   var oldRendererWidth = scene.renderer.domElement.width;
  //   var oldRendererHeight = scene.renderer.domElement.height;

  //   scene.resize(width, height);

  //   var newRendererWidth = scene.renderer.domElement.width;
  //   var newRendererHeight = scene.renderer.domElement.height;

  //   expect(newRendererWidth).to.not.equal(oldRendererWidth);
  //   expect(newRendererHeight).to.not.equal(oldRendererHeight);
  // });
});