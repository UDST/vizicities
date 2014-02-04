describe("Mediator", function() {

	it("exists in `VIZI`", function() {
		expect(VIZI.Mediator).to.exist;
	});

	it("has a 'publish' function", function() {
		expect(VIZI.Mediator).to.have.property("publish");
	});

	it("has a 'subscribe' function", function() {
		expect(VIZI.Mediator).to.have.property("subscribe");
	});

	it("subscribes and publishes to a topic", function() {
		var spy = sinon.spy();
		var message = "this is a message";

		VIZI.Mediator.subscribe("test_topic", spy);
		VIZI.Mediator.publish("test_topic", message);

		assert.equal(message, spy.args[0][0]);
	});
});