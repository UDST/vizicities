describe("VIZI.Attribution", function() {
  var attribution;
  var element;

  before(function() {
    element = document.createElement("div");
    attribution = new VIZI.Attribution({
      element: element
    });
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.Attribution).to.exist;
  });

  it("throws error when missing element element", function() {
    expect(function() { new VIZI.Attribution(); }).to.throw(Error);
  });

  it("has a defaultMessage property", function() {
    expect(attribution.defaultMessage).to.exist;
  });

  it("has a container property", function() {
    expect(attribution.container).to.exist;
  });

  it("has a createContainer method", function() {
    expect(attribution.createContainer).to.exist;
  });

  it("has an add method", function() {
    expect(attribution.add).to.exist;
  });

  it("can create attribution DOM", function() {
    expect(attribution.container.nodeName).to.equal("DIV");
  });

  it("can add message to attribution", function() {
    var oldMessage = attribution.container.innerHTML;
    var message = "Testing";

    attribution.add(message);

    var newMessage = attribution.container.innerHTML;
    
    expect(newMessage).to.not.equal(oldMessage);
    expect(newMessage.length).to.be.above(oldMessage.length);
  });
});