describe("Loop", function() {
	var loop;

	before(function () {
		loop = new VIZI.Loop();
	});

	it("exists in `VIZI`", function() {
		expect(VIZI.Loop).to.exist;
	});

	it("has a 'start' function", function() {
		expect(loop).to.have.property("start");
	});

	it("has a 'stop' function", function() {
		expect(loop).to.have.property("stop");
	});

	it("has a 'tick' function", function() {
		expect(loop).to.have.property("tick");
	});

	it("starts loop", function() {
		var spy = new sinon.spy(loop, "start");
		loop.stop(); // Stop default loop
		loop.start();

		assert.equal(spy.called, true);
		assert.equal(loop.stopLoop, false);
		
		loop.stop();
	});

	it("calls `tick()` on start", function() {
		var spy = new sinon.spy(loop, "tick");
		loop.start();
		loop.stop();

		assert.equal(spy.called, true);
	});

	it("stops loop", function() {
		var spy = new sinon.spy(loop, "stop");
		loop.start();
		loop.stop();

		assert.equal(spy.called, true);
		assert.equal(loop.stopLoop, true);
	});
});