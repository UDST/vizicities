describe("VIZI.Camera", function() {
  var camera;

  before(function() {
    camera = new VIZI.Camera({
      aspect: 1024 / 768
    });
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.Camera).to.exist;
  });

  it("has a camera property", function() {
    expect(camera.camera).to.exist;
  });

  it("has a moveTo method", function() {
    expect(camera.moveTo).to.exist;
  });

  it("has a moveBy method", function() {
    expect(camera.moveBy).to.exist;
  });

  it("has a lookAt method", function() {
    expect(camera.lookAt).to.exist;
  });

  it("has an changeAspect method", function() {
    expect(camera.changeAspect).to.exist;
  });

  it("throws error when missing aspect option", function() {
    expect(function() { new VIZI.Camera(); }).to.throw(Error);
  });

  it("sets default options when some are missing", function() {
    expect(camera.options).to.exist;
    expect(camera.options).to.be.a.object;
    expect(camera.options).to.have.property("fov");
    expect(camera.options).to.have.property("near");
    expect(camera.options).to.have.property("far");
    expect(camera.options).to.have.property("position");
    expect(camera.options).to.have.property("target");
  });

  it("can override default options", function() {
    var override = new VIZI.Camera({
      aspect: 1024 / 768,
      fov: 20,
      near: 10,
      far: 800,
      position: new VIZI.Point(100, 100, 100),
      target: new VIZI.Point(500, 0, 0)
    });

    expect(override.options).to.exist;
    expect(override.options).to.be.a.object;
    expect(camera.options).to.have.property("fov");
    expect(camera.options).to.have.property("near");
    expect(camera.options).to.have.property("far");
    expect(camera.options).to.have.property("position");
    expect(camera.options).to.have.property("target");

    expect(override.options.fov).to.equal(20);
    expect(override.options.near).to.equal(10);
    expect(override.options.far).to.equal(800);

    expect(override.options.position.x).to.equal(100);
    expect(override.options.position.y).to.equal(100);
    expect(override.options.position.z).to.equal(100);

    expect(override.options.target.x).to.equal(500);
    expect(override.options.target.y).to.equal(0);
    expect(override.options.target.z).to.equal(0);

    override = undefined;
  });

  it("can move to pixel position", function() {
    var oldPosition = camera.camera.position.clone();
    var point = new VIZI.Point(5000, 5000, 5000);

    camera.moveTo(point);

    var newPosition = camera.camera.position.clone();

    expect(newPosition.x).to.not.equal(oldPosition.x);
    expect(newPosition.y).to.not.equal(oldPosition.y);
    expect(newPosition.z).to.not.equal(oldPosition.z);
  });

  it("can move by pixel delta", function() {
    var oldPosition = camera.camera.position.clone();
    var delta = new VIZI.Point(100, 100, 100);

    camera.moveBy(delta);

    var newPosition = camera.camera.position.clone();

    expect(newPosition.x).to.equal(oldPosition.x + delta.x);
    expect(newPosition.y).to.equal(oldPosition.y + delta.y);
    expect(newPosition.z).to.equal(oldPosition.z + delta.z);
  });

  it("can look at target", function() {
    var spy = new sinon.spy(camera.camera, "lookAt");
    var target = new VIZI.Point(20, 20, 20);

    camera.lookAt(target);

    expect(spy).to.have.been.called;
  });

  it("can change camera aspect ratio", function() {
    var aspect = 1920 / 1080;
    var oldAspect = camera.camera.aspect;

    camera.changeAspect(aspect);

    var newAspect = camera.camera.aspect;

    expect(newAspect).to.equal(aspect);
  });
});