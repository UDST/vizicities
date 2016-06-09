describe("VIZI.Controls", function() {
  var camera;
  var controls;

  // TODO: Use VIZI.Camera
  before(function() {
    camera = new THREE.PerspectiveCamera(40, 800 / 600, 2, 40000);

    camera.position.x = 100;
    camera.position.y = 50;
    camera.position.z = 100;

    controls = new VIZI.Controls(camera);
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.Controls).to.exist;
  });

  it("throws error when missing camera", function() {
    expect(function() { new VIZI.Controls(); }).to.throw(Error);
  });

  it("sets default options when some are missing", function() {
    expect(controls.options).to.exist;
    expect(controls.options).to.be.a.object;
  });

  it("can override default options", function() {
    var controls2 = new VIZI.Controls(camera, {});

    expect(controls2.options).to.exist;
    expect(controls2.options).to.be.a.object;

    controls2 = undefined;
  });

  it("has an on method", function() {
    expect(controls.on).to.exist;
  });

  it("has an emit method", function() {
    expect(controls.emit).to.exist;
  });
});