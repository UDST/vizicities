describe("VIZI.Camera", function() {
  var camera;

  before(function() {
    camera = new VIZI.Camera();
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
    var temp = new VIZI.Camera({
      aspect   : 1024 / 768,
      fov      : 20,
      near     : 10,
      far      : 800,
      position : new VIZI.Point(100, 100, 100),
      target   : new VIZI.Point(500, 0, 0)
    });

    expect(temp.options).to.exist;
    expect(temp.options).to.be.a.object;
    expect(temp.options).to.have.property("aspect");
    expect(temp.options).to.have.property("fov");
    expect(temp.options).to.have.property("near");
    expect(temp.options).to.have.property("far");
    expect(temp.options).to.have.property("position");
    expect(temp.options).to.have.property("target");

    expect(temp.options.fov).to.equal(20);
    expect(temp.options.near).to.equal(10);
    expect(temp.options.far).to.equal(800);

    expect(temp.options.position.x).to.equal(100);
    expect(temp.options.position.y).to.equal(100);
    expect(temp.options.position.z).to.equal(100);

    expect(temp.options.target.x).to.equal(500);
    expect(temp.options.target.y).to.equal(0);
    expect(temp.options.target.z).to.equal(0);
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

    camera.camera.lookAt.restore()
    spy = undefined;
  });

  it("can change camera aspect ratio", function() {
    var aspect = 1920 / 1080;
    var oldAspect = camera.camera.aspect;

    camera.changeAspect(aspect);

    var newAspect = camera.camera.aspect;

    expect(newAspect).to.equal(aspect);
  });
});