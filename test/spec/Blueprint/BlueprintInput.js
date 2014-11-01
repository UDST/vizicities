describe("VIZI.BlueprintInput", function() {
  var input;

  before(function() {
    input = new VIZI.BlueprintInput();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintInput).to.exist;
  });

  it("has an options property", function() {
    expect(input.options).to.exist;
  });

  it("has an triggers property", function() {
    expect(input.triggers).to.exist;
  });

  it("has an actions property", function() {
    expect(input.actions).to.exist;
  });

  it("has an on method", function() {
    expect(input.on).to.exist;
  });

  it("has an emit method", function() {
    expect(input.emit).to.exist;
  });

  it("has an init method", function() {
    expect(input.init).to.exist;
  });
});