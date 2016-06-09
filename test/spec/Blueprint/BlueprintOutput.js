describe("VIZI.BlueprintOutput", function() {
  var output;

  before(function() {
    output = new VIZI.BlueprintOutput();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintInput).to.exist;
  });

  it("is an instance of VIZI.Layer", function() {
    expect(output).to.be.an.instanceOf(VIZI.Layer);
  });

  it("has an options property", function() {
    expect(output.options).to.exist;
  });

  it("has an triggers property", function() {
    expect(output.triggers).to.exist;
  });

  it("has an actions property", function() {
    expect(output.actions).to.exist;
  });

  it("has an on method", function() {
    expect(output.on).to.exist;
  });

  it("has an emit method", function() {
    expect(output.emit).to.exist;
  });

  it("has an init method", function() {
    expect(output.init).to.exist;
  });

  it("has an onTick method", function() {
    expect(output.onTick).to.exist;
  });
});