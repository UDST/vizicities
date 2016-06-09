describe("VIZI.Clock", function() {
  var clock;

  before(function() {
    clock = new VIZI.Clock();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.Clock).to.exist;
  });

  it("has a startTime property", function() {
    expect(clock.startTime).to.exist;
  });

  it("has a oldTime property", function() {
    expect(clock.oldTime).to.exist;
  });

  it("has a elapsedTime property", function() {
    expect(clock.elapsedTime).to.exist;
  });

  it("has a running property", function() {
    expect(clock.running).to.exist;
  });

  it("has a start method", function() {
    expect(clock.start).to.exist;
  });

  it("has a stop method", function() {
    expect(clock.stop).to.exist;
  });

  it("has a getElapsedTime method", function() {
    expect(clock.getElapsedTime).to.exist;
  });

  it("has a getDelta method", function() {
    expect(clock.getDelta).to.exist;
  });

  it("can automatically start the clock on first delta request", function() {
    expect(clock.running).to.equal(false);
    expect(clock.startTime).to.equal(0);

    var delta = clock.getDelta();

    expect(clock.running).to.equal(true);
    expect(clock.startTime).to.be.above(0);    
  });

  it("can retreive elapsed time", function() {
    var elapsedTime = clock.getElapsedTime();

    expect(clock.elapsedTime).to.be.above(0);
  });

  it("can retreive delta and update previous time", function() {
    var tmpClock = new VIZI.Clock();
    var oldTime = tmpClock.oldTime;
    var elapsedTime = tmpClock.elapsedTime;

    // TODO: Is this timeout causing the test to always pass?
    setTimeout(function() {
      var delta = tmpClock.getDelta();
      expect(delta).to.be.above(0);
      expect(tmpClock.oldTime).to.be.above(oldTime);
      expect(tmpClock.elapsedTime).to.equal(elapsedTime + delta);
    }, 200);
  });

  it("can stop the clock", function() {
    expect(clock.running).to.equal(true);

    clock.stop();

    expect(clock.running).to.equal(false);
  });
});