describe("VIZI.BlueprintInputGPX", function() {
  var input;

  before(function() {
    input = new VIZI.BlueprintInputGPX();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintInputGPX).to.exist;
  });

  it("has a requestData method", function() {
    expect(input.requestData).to.exist;
  });

  // TODO: Enable when a CORS-enabled endpoint can be found for the data
  // it("can request data", function() {
  //   var input2 = new VIZI.BlueprintInputGPX({
  //     path: "/path/to/sample.gpx"
  //   });

  //   var spy = new sinon.spy(input2, "requestData");

  //   input2.requestData();

  //   expect(spy).to.have.been.called;

  //   input2.requestData.restore();
  //   input2 = undefined;
  //   spy = undefined;
  // });
  
  // TODO: Enable when a CORS-enabled endpoint can be found for the data
  // it("can send event after receiving data", function() {
  //   var input2 = new VIZI.BlueprintInputGPX({
  //     path: "/path/to/sample.gpx"
  //   });

  //   var spy = sinon.spy();

  //   input2.on("dataReceived", spy);
  //   input2.requestData();

  //   setTimeout(function() {
  //     expect(spy).to.have.been.called;
  //     expect(spy.args[0].length).to.equal(1);
  //     input2 = undefined;
  //     spy = undefined;
  //   }, 500);
  // });
});