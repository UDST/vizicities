describe("VIZI.Point", function() {
  it("exists in VIZI namespace", function() {
    expect(VIZI.Point).to.exist;
  });

  it("sets default values when none are passed in", function() {
    var point = new VIZI.Point();

    expect(point.x).to.equal(0);
    expect(point.y).to.equal(0);
    expect(point.z).to.equal(0);
  });

  it("can understand values as arguments", function() {
    var point = new VIZI.Point(1, 2);

    expect(point.x).to.equal(1);
    expect(point.y).to.equal(2);
    expect(point.z).to.equal(0);

    point = new VIZI.Point(1, 2, 3);

    expect(point.x).to.equal(1);
    expect(point.y).to.equal(2);
    expect(point.z).to.equal(3);
  });

  it("can understand values as an array", function() {
    var point = new VIZI.Point([1, 2]);

    expect(point.x).to.equal(1);
    expect(point.y).to.equal(2);
    expect(point.z).to.equal(0);

    point = new VIZI.Point([1, 2, 3]);

    expect(point.x).to.equal(1);
    expect(point.y).to.equal(2);
    expect(point.z).to.equal(3);
  });

  it("can understand values as a VIZI.Point object", function() {
    var point = new VIZI.Point(new VIZI.Point(1, 2));

    expect(point.x).to.equal(1);
    expect(point.y).to.equal(2);
    expect(point.z).to.equal(0);

    point = new VIZI.Point(new VIZI.Point(1, 2, 3));

    expect(point.x).to.equal(1);
    expect(point.y).to.equal(2);
    expect(point.z).to.equal(3);
  });

  it("can add from another point", function() {
    var point1 = new VIZI.Point(5, 5);
    var point2 = new VIZI.Point(1, 1);
    var add = point1.add(point2);

    expect(add.x).to.equal(6);
    expect(add.y).to.equal(6);
  });

  it("can subtract from another point", function() {
    var point1 = new VIZI.Point(5, 5);
    var point2 = new VIZI.Point(1, 1);
    var subtract = point1.subtract(point2);

    expect(subtract.x).to.equal(4);
    expect(subtract.y).to.equal(4);
  });
});