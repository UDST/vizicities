
describe("VIZI.Scene", function() {
  var scene;

  before(function() {
    scene = new VIZI.Scene();
    scene.init();
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.Scene).to.exist;
  });

  it("has a init method", function() {
    expect(scene.init).to.exist;
  });

  it("has an add method", function() {
    expect(scene.add).to.exist;
  });

  it("has a remove method", function() {
    expect(scene.remove).to.exist;
  });

  it("has a scene property that contains a THREE.Scene instance", function() {
    expect(scene.scene).to.exist;
    expect(scene.scene).to.be.an.instanceof(THREE.Scene);
  });

  it("can add object to the scene", function() {
    var object = new THREE.Object3D();
    var prevObjectCount = scene.scene.children.length;

    scene.add(object);

    expect(scene.scene.children.length).to.equal(prevObjectCount + 1);
  });

  it("can remove object from the scene", function() {
    var object = new THREE.Object3D();
    var prevObjectCount = scene.scene.children.length;

    scene.add(object);

    expect(scene.scene.children.length).to.equal(prevObjectCount + 1);

    scene.remove(object);

    expect(scene.scene.children.length).to.equal(prevObjectCount);    
  });
});