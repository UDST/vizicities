describe("VIZI", function() {
  it("is added to window global", function() {
    expect(window.VIZI).to.exist;
  });

  it("has a version number", function() {
    expect(VIZI.VERSION).to.exist;
  });

  it("has a debug flag", function() {
    expect(VIZI.DEBUG).to.exist;
  });
});