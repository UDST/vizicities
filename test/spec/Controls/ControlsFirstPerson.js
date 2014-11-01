describe("VIZI.ControlsFirstPerson", function() {
  var camera;
  var controls;

  // TODO: Use VIZI.Camera
  before(function() {
    camera = new VIZI.Camera({aspect: 1024 / 768})
    controls = new VIZI.ControlsFirstPerson(camera);
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.ControlsFirstPerson).to.exist;
  });

  it("has a controls property which is an instance of THREE.FirstPersonControls", function() {
    expect(controls.controls).to.be.an.instanceOf(THREE.FirstPersonControls);
  });

  it("has a moveTo method", function() {
    expect(controls.moveTo).to.exist;
  });

  it("has a moveBy method", function() {
    expect(controls.moveBy).to.exist;
  });

  it("has an onTick method", function() {
    expect(controls.onTick).to.exist;
  });

  it("can move to a pixel position", function() {
    var point = new VIZI.Point(0, 0);
    var oldPosition = new VIZI.Point(controls.controls.object.x, controls.controls.object.z);

    controls.moveTo(point);

    var newPosition = new VIZI.Point(controls.controls.object.x, controls.controls.object.z);

    expect(newPosition.x).to.equal(point.x);
    expect(newPosition.y).to.equal(point.y);

    point = new VIZI.Point(100, 100);
    oldPosition = new VIZI.Point(controls.controls.object.x, controls.controls.object.z);

    controls.moveTo(point);

    newPosition = new VIZI.Point(controls.controls.object.x, controls.controls.object.z);

    expect(newPosition.x).to.equal(point.x);
    expect(newPosition.y).to.equal(point.y);
  });

  it("can move by a pixel amount", function() {
    var delta = new VIZI.Point(0, 0);
    var oldPosition = new VIZI.Point(controls.controls.object.x, controls.controls.object.z);

    controls.moveBy(delta);

    var newPosition = new VIZI.Point(controls.controls.object.x, controls.controls.object.z);

    expect(newPosition.x).to.equal(oldPosition.x + delta.x);
    expect(newPosition.y).to.equal(oldPosition.y + delta.y);

    delta = new VIZI.Point(100, 100);
    oldPosition = new VIZI.Point(controls.controls.object.x, controls.controls.object.z);

    controls.moveBy(delta);
    controls.moveBy(delta);

    newPosition = new VIZI.Point(controls.controls.object.x, controls.controls.object.z);

    expect(newPosition.x).to.equal(oldPosition.x + (delta.x*2));
    expect(newPosition.y).to.equal(oldPosition.y + (delta.y*2));
  });

  it("can update controls on tick", function() {
    var spy = new sinon.spy(controls.controls, "update");
    var delta = 0.01;

    controls.onTick(delta);

    expect(spy).to.have.been.calledWith(delta);

    controls.controls.update.restore();
  });
});