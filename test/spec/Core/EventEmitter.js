describe("VIZI.EventEmitter", function() {
  var emitter;

  before(function() {
    emitter = new VIZI.EventEmitter();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.EventEmitter).to.exist;
  });

  it("has an on method", function() {
    expect(emitter.on).to.exist;
  });

  it("has an emit method", function() {
    expect(emitter.emit).to.exist;
  });

  it("can subscribe and publish to an internal event", function() {
    var spy = sinon.spy();
    var message = "this is a message";

    emitter.on("test_topic", spy);
    emitter.emit("test_topic", message);

    expect(spy).to.have.been.calledWith(message);
  });
});