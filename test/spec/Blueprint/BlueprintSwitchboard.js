describe("VIZI.BlueprintSwitchboard", function() {
  var config;
  var switchboard;
  var world;

  before(function() {
    world = new VIZI.World({
      viewport: document.createElement("div"),
      camera: new VIZI.Camera({
        aspect: 1024 / 768
      })
    });

    config = {
      input: {
        type: "BlueprintInputMapTiles",
        options: {
          tilePath: "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png"
        }
      },
      output: {
        type: "BlueprintOutputImageTiles",
        options: {
          grids: [{
            zoom: 13,
            tilesPerDirection: 5,
            cullZoom: 11
          }]
        }
      },
      triggers: [{
        triggerObject: "output",
        triggerName: "initialised",
        triggerArguments: ["tiles"],
        actionObject: "input",
        actionName: "requestTiles",
        actionArguments: ["tiles"],
        actionOutput: {
          tiles: "tiles" // actionArg: triggerArg
        }
      }, {
        triggerObject: "output",
        triggerName: "gridUpdated",
        triggerArguments: ["tiles"],
        actionObject: "input",
        actionName: "requestTiles",
        actionArguments: ["tiles"],
        actionOutput: {
          tiles: "tiles" // actionArg: triggerArg
        }
      }, {
        triggerObject: "input",
        triggerName: "tileReceived",
        triggerArguments: ["image", "tile"],
        actionObject: "output",
        actionName: "outputImageTile",
        actionArguments: ["image", "tile"],
        actionOutput: {
          image: "image", // actionArg: triggerArg
          tile: "tile"
        }
      }]
    };

    switchboard = new VIZI.BlueprintSwitchboard(config);
  });

  it("exists in VIZI namespace", function() {
    expect(VIZI.BlueprintSwitchboard).to.exist;
  });

  it("has an processConfig method", function() {
    expect(switchboard.processConfig).to.exist;
  });

  it("has an createViziClassInstance method", function() {
    expect(switchboard.createViziClassInstance).to.exist;
  });

  it("has an getValueByKeys method", function() {
    expect(switchboard.getValueByKeys).to.exist;
  });

  it("has an addToWorld method", function() {
    expect(switchboard.addToWorld).to.exist;
  });

  it("has an onTick method", function() {
    expect(switchboard.onTick).to.exist;
  });

  it("throws error when missing config argument", function() {
    expect(function() { new VIZI.BlueprintSwitchboard(); }).to.throw(Error);
  });

  it("throws error when missing input config", function() {
    var tmpConfig = {output: {}, triggers: {}};
    expect(function() { new VIZI.BlueprintSwitchboard(tmpConfig); }).to.throw(Error);
  });

  it("throws error when missing output config", function() {
    var tmpConfig = {input: {}, triggers: {}};
    expect(function() { new VIZI.BlueprintSwitchboard(tmpConfig); }).to.throw(Error);
  });

  it("throws error when missing triggers config", function() {
    var tmpConfig = {input: {}, output: {}};
    expect(function() { new VIZI.BlueprintSwitchboard(tmpConfig); }).to.throw(Error);
  });

  it("throws error when trigger or action object reference is incorrect", function() {
    var tmpConfig = {
      input: {
        type: "BlueprintInputMapTiles",
        options: {
          tilePath: "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png"
        }
      },
      output: {
        type: "BlueprintOutputImageTiles",
        options: {
          grids: [{
            zoom: 13,
            tilesPerDirection: 5,
            cullZoom: 11
          }]
        }
      },
      triggers: [{
        triggerObject: "notOutput",
        triggerName: "initialised",
        triggerArguments: ["tiles"],
        actionObject: "notInput",
        actionName: "requestTiles",
        actionArguments: ["tiles"],
        actionOutput: {
          tiles: "tiles" // actionArg: triggerArg
        }
      }]
    };

    expect(function() { new VIZI.BlueprintSwitchboard(tmpConfig); }).to.throw(Error);
  });

  it("throws error when required action arguments are missing", function() {
    var tmpConfig = {
      input: {
        type: "BlueprintInputMapTiles",
        options: {
          tilePath: "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png"
        }
      },
      output: {
        type: "BlueprintOutputImageTiles",
        options: {
          grids: [{
            zoom: 13,
            tilesPerDirection: 5,
            cullZoom: 11
          }]
        }
      },
      triggers: [{
        triggerObject: "output",
        triggerName: "initialised",
        triggerArguments: ["tiles"],
        actionObject: "input",
        actionName: "requestTiles",
        actionArguments: ["notTiles"],
        actionOutput: {
          tiles: "tiles" // actionArg: triggerArg
        }
      }]
    };

    var tmpSwitchboard = new VIZI.BlueprintSwitchboard(tmpConfig);

    expect(function() { tmpSwitchboard.output.emit("initialised"); }).to.throw(Error);
  });

  it("throws error when action output is a complex map and process and transformation properties are missing", function() {
    var tmpConfig = {
      input: {
        type: "BlueprintInputMapTiles",
        options: {
          tilePath: "http://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.json"
        }
      },
      output: {
        type: "BlueprintOutputImageTiles",
        options: {
          grids: [{
            zoom: 15,
            tilesPerDirection: 1,
            cullZoom: 13
          }]
        }
      },
      triggers: [{
        triggerObject: "input",
        triggerName: "tileReceived",
        triggerArguments: ["geoJSON", "tile"],
        actionObject: "output",
        actionName: "outputBuildingTile",
        actionArguments: ["buildings", "tile"],
        actionOutput: {
          buildings: {
            // process: "map",
            itemsObject: "geoJSON",
            itemsProperties: "features"
            // transformation: {
            //   outline: "geometry.coordinates",
            //   height: "properties.height"
            // }
          },
          tile: "tile"
        }
      }]
    };

    var tmpSwitchboard = new VIZI.BlueprintSwitchboard(tmpConfig);

    expect(function() { tmpSwitchboard.input.emit("tileReceived"); }).to.throw(Error);
  });

  it("can process config and create input and output instances", function() {
    expect(switchboard.input).to.be.an.instanceOf(VIZI.BlueprintInput);
    expect(switchboard.output).to.be.an.instanceOf(VIZI.BlueprintOutput);
  });

  it("can add output to world", function() {
    var spy = new sinon.spy(switchboard.output, "addToWorld");

    switchboard.addToWorld(world);

    expect(spy).to.be.called;
  });

  it("can process config and map inputs with outputs", function() {
    var spy1 = new sinon.spy(switchboard.input, "requestTiles");
    var spy2 = new sinon.spy(switchboard.output, "outputImageTile");

    switchboard.addToWorld(world);

    expect(spy1).to.be.called;

    setTimeout(function() {
      expect(spy2).to.be.called;
    }, 500);
  });

  it("can update output on tick", function () {
    var spy = new sinon.spy(switchboard.output, "onTick");
    var delta = 0.01;

    switchboard.onTick(delta);

    expect(spy).to.have.been.called;
  });
});