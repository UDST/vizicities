describe("VIZI.BlueprintInputKML", function() {
  var input;

  before(function() {
    input = new VIZI.BlueprintInputKML();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintInputKML).to.exist;
  });

  it("has a requestData method", function() {
    expect(input.requestData).to.exist;
  });

  it("has a processCoordinates method", function() {
    expect(input.processCoordinates).to.exist;
  });

  // TODO: Enable when a CORS-enabled endpoint can be found for the data
  // it("can request data", function() {
  //   var input2 = new VIZI.BlueprintInputKML({
  //     path: "http://cl.ly/3L0Q0e1H421G/sample.kml"
  //   });

  //   var spy = new sinon.spy(input2, "requestData");

  //   input2.requestData();

  //   expect(spy).to.have.been.called;

  //   input2 = undefined;
  // });
  
  // TODO: Enable when a CORS-enabled endpoint can be found for the data
  // it("can send event after receiving data", function() {
  //   var input2 = new VIZI.BlueprintInputKML({
  //     path: "http://cl.ly/3L0Q0e1H421G/sample.kml"
  //   });

  //   var spy = sinon.spy();

  //   input2.on("dataReceived", spy);
  //   input2.requestData();

  //   setTimeout(function() {
  //     expect(spy).to.have.been.called;
  //     expect(spy.args[0].length).to.equal(1);
  //   }, 500);

  //   input2 = undefined;
  // });
});