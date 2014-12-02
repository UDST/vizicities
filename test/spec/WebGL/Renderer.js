// TODO: Improve WebGL and DOM testing

describe("VIZI.Renderer", function() {
  var renderer;
  var viewportDOM;

  before(function() {
    viewportDOM = document.createElement("div")

    renderer = new VIZI.Renderer({ headless : !ViziTestsWebGLSupported });
    renderer.init({ viewport : viewportDOM });
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.Renderer).to.exist;
  });
  
  it("has a init method", function() {
    expect(renderer.init).to.exist;
  });

  it("has a render method", function() {
    expect(renderer.render).to.exist;
  });

  it("has a resize method", function() {
    expect(renderer.resize).to.exist;
  });

  // This test cannot be ran without a non-headless renderer.
  // It will throw but not due to being headless.
  if (ViziTestsWebGLSupported) {
    it("throws error when init is missing viewport", function() {
      expect(function() {
        var temp = new VIZI.Renderer();
        temp.init({});
      }).to.throw(Error);
    });
  }

  it("throws error when rendering without scene", function() {
    expect(function() {
      renderer.render(undefined, {});
    }).to.throw(Error);
  });

  it("throws error when rendering without camera", function() {
    expect(function() {
      renderer.render({}, undefined);
    }).to.throw(Error);
  });

  it("sets default options when some are missing", function() {
    expect(renderer.options).to.exist;
    expect(renderer.options).to.be.a.object;
    expect(renderer.options).to.have.property("headless");
    expect(renderer.options).to.have.property("antialias");
    expect(renderer.options).to.have.property("fogColour");
  });

  it("can override default options", function() {
    var temp = new VIZI.Renderer({
      headless  : true,
      antialias : true,
      fogColour : 0x000000,
    });

    expect(temp.options).to.exist;
    expect(temp.options).to.be.a.object;
    expect(temp.options).to.have.property("headless");
    expect(temp.options).to.have.property("antialias");
    expect(temp.options).to.have.property("fogColour");

    expect(temp.options.headless).to.equal(true);
    expect(temp.options.antialias).to.equal(true);
    expect(temp.options.fogColour).to.equal(0x000000);
  });

  if (ViziTestsWebGLSupported) {
    it("can create a renderer that is added to the viewport", function() {
      expect(viewportDOM.children.length).to.equal(1);
      expect(viewportDOM.firstChild.nodeName).to.equal("CANVAS");
    });
  }

  it("can render when passed scene and camera", function() {
    var spy = new sinon.spy(renderer, "render");

    var scene = new VIZI.Scene();
    var camera = new VIZI.Camera();
    camera.lookAt(new VIZI.Point());
    renderer.render(scene, camera);

    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(scene, camera);

    renderer.render.restore();
  });

  // TODO: Disabled until WebGL in Slimer can be solved
  // it("can update renderer size", function() {
  //   // Fake window resize dimensions
  //   var width = 1920;
  //   var height = 1080;

  //   var oldRendererWidth = renderer.domElement.width;
  //   var oldRendererHeight = renderer.domElement.height;

  //   renderer.resize(width, height);

  //   var newRendererWidth = renderer.domElement.width;
  //   var newRendererHeight = renderer.domElement.height;

  //   expect(newRendererWidth).to.not.equal(oldRendererWidth);
  //   expect(newRendererHeight).to.not.equal(oldRendererHeight);
  // });
});