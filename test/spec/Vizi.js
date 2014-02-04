describe("VIZI", function() {
	it("Added to window global", function() {
		expect(window.VIZI).to.exist;
	});

	it("Version number exists", function() {
		expect(VIZI.VERSION).to.exist;
	});
});