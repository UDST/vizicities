describe("Log", function() {
	
	var spy;

	before(function(){
		spy = sinon.spy(VIZI, "Log");
	});

	afterEach(function(){
		spy.reset(); // reset spy on every test, otherwise call information gets stacked.
	});

	it("exists in `VIZI`", function() {
		expect(VIZI.Log).to.exist;
	});

	it("runs `Log` function", function() {

		VIZI.Log("arg1", "arg2", "arg3");
		expect(spy).to.have.been.called;
	});

	it("accepts and sets arguments correctly", function() {

		VIZI.Log("arg1", 2, {"arg": 3});
		expect(spy).to.have.been.calledWithExactly("arg1", 2, {"arg": 3});
	});
});