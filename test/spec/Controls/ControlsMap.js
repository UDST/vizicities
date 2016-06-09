describe("VIZI.ControlsMap", function() {
  var camera;
  var controls;

  // TODO: Use VIZI.Camera
  before(function() {
    var fakeViewport = document.body;
    fakeViewport.appendChild(document.createElement("canvas"));
    
    camera = new VIZI.Camera({aspect: 1024 / 768})
    controls = new VIZI.ControlsMap(camera, {viewport: fakeViewport});
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.ControlsMap).to.exist;
  });

  it("has a controls property which is an instance of THREE.MapControls", function() {
    expect(controls.controls).to.be.an.instanceOf(THREE.MapControls);
  });

  it("has a moveTo method", function() {
    expect(controls.moveTo).to.exist;
  });

  it("has a moveBy method", function() {
    expect(controls.moveBy).to.exist;
  });

  it("has a zoomTo method", function() {
    expect(controls.zoomTo).to.exist;
  });

  it("has a getZoom method", function() {
    expect(controls.getZoom).to.exist;
  });

  it("has an onTick method", function() {
    expect(controls.onTick).to.exist;
  });

  it("can move to a pixel position", function() {
    var point = new VIZI.Point(0, 0);
    var oldPosition = new VIZI.Point(controls.controls.target.x, controls.controls.target.z);

    controls.moveTo(point);

    var newPosition = new VIZI.Point(controls.controls.target.x, controls.controls.target.z);

    expect(newPosition.x).to.equal(point.x);
    expect(newPosition.y).to.equal(point.y);

    point = new VIZI.Point(100, 100);
    oldPosition = new VIZI.Point(controls.controls.target.x, controls.controls.target.z);

    controls.moveTo(point);

    newPosition = new VIZI.Point(controls.controls.target.x, controls.controls.target.z);

    expect(newPosition.x).to.equal(point.x);
    expect(newPosition.y).to.equal(point.y);
  });

  it("can move by a pixel amount", function() {
    var delta = new VIZI.Point(0, 0);
    var oldPosition = new VIZI.Point(controls.controls.target.x, controls.controls.target.z);

    controls.moveBy(delta);

    var newPosition = new VIZI.Point(controls.controls.target.x, controls.controls.target.z);

    expect(newPosition.x).to.equal(oldPosition.x + delta.x);
    expect(newPosition.y).to.equal(oldPosition.y + delta.y);

    delta = new VIZI.Point(100, 100);
    oldPosition = new VIZI.Point(controls.controls.target.x, controls.controls.target.z);

    controls.moveBy(delta);
    controls.moveBy(delta);

    newPosition = new VIZI.Point(controls.controls.target.x, controls.controls.target.z);

    expect(newPosition.x).to.equal(oldPosition.x + (delta.x*2));
    expect(newPosition.y).to.equal(oldPosition.y + (delta.y*2));
  });

  it("can get zoom distance", function() {
    var distance = controls.getZoom();
    expect(distance).to.be.above(0);
  });

  it("can zoom to a pixel distance", function() {
    var distance = 1000;
    var oldDistance = controls.getZoom();

    controls.zoomTo(1000);

    var newDistance = controls.getZoom();

    expect(Math.round(newDistance)).to.equal(distance);
  });

  it("can fire an event on move", function() {
    var spy = sinon.spy();
    VIZI.Messenger.on("controls:move", spy);

    var point = new VIZI.Point(100, 100);
    controls.moveTo(point);

    expect(spy).to.have.been.called;

    spy = undefined;
  });

  it("can fire an event on zoom", function() {
    var spy = sinon.spy();
    VIZI.Messenger.on("controls:zoom", spy);

    var distance = 1000;
    var oldDistance = controls.getZoom();

    controls.zoomTo(1000);

    var newDistance = controls.getZoom();

    expect(spy).to.have.been.called;

    spy = undefined;
  });

  it("can update controls on tick", function() {
    var spy = new sinon.spy(controls.controls, "update");
    var delta = 0.01;

    controls.onTick(delta);

    expect(spy).to.have.been.calledWith(delta);

    controls.controls.update.restore();
    spy = undefined;
  });
});