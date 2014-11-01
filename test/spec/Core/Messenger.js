describe("VIZI.Messenger", function() {
  var messenger = VIZI.Messenger;

  it("exists in VIZI namespace", function() {
    expect(VIZI.Messenger).to.exist;
  });

  it("has an on method", function() {
    expect(messenger.on).to.exist;
  });

  it("has an emit method", function() {
    expect(messenger.emit).to.exist;
  });

  it("can subscribe and publish to a global event", function() {
    var spy = sinon.spy();
    var message = "this is a message";

    messenger.on("test_topic", spy);
    messenger.emit("test_topic", message);

    expect(spy).to.have.been.calledWith(message);
  });
});