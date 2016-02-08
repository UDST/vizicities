var world = new VIZI.World({
  viewport: document.querySelector("#vizicities-viewport"),
  center: new VIZI.LatLon(40.01000594412381, -105.2727379358738)
});

var controls = new VIZI.ControlsMap(world.camera, {
  viewport: world.options.viewport
});

var colladaConfig = {
  input: {
    type: "BlueprintInputKML",
    options: {
      path: "./data/sample.kml"
    }
  },
  output: {
    type: "BlueprintOutputCollada",
    options: {
      modelPathPrefix: "./data/",
      infoUI: true
    }
  },
  triggers: [{
    triggerObject: "output",
    triggerName: "initialised",
    triggerArguments: [],
    actionObject: "input",
    actionName: "requestData",
    actionArguments: [],
    actionOutput: {}
  }, {
    triggerObject: "input",
    triggerName: "dataReceived",
    triggerArguments: ["kml"],
    actionObject: "output",
    actionName: "outputCollada",
    actionArguments: ["collada"],
    actionOutput: {
      collada: {
        process: "map",
        itemsObject: "kml",
        itemsProperties: "placemark.model",
        transformation: {
          coordinates: ["location.longitude", "location.latitude"],
          modelPath: "link.href"
        }
      }
    }
  }]
};

var switchboardCollada = new VIZI.BlueprintSwitchboard(colladaConfig);
switchboardCollada.addToWorld(world);

var mapConfig = {
  input: {
    type: "BlueprintInputMapTiles",
    options: {
      tilePath: "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png"
    }
  },
  output: {
    type: "BlueprintOutputImageTiles",
    options: {
      grids: [{
        zoom: 19,
        tilesPerDirection: 3,
        cullZoom: 17
      }, {
        zoom: 18,
        tilesPerDirection: 3,
        cullZoom: 16
      }, {
        zoom: 17,
        tilesPerDirection: 3,
        cullZoom: 15
      }, {
        zoom: 16,
        tilesPerDirection: 3,
        cullZoom: 14
      }, {
        zoom: 15,
        tilesPerDirection: 3,
        cullZoom: 13
      }, {
        zoom: 14,
        tilesPerDirection: 3,
        cullZoom: 12
      }, {
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

var switchboardMap = new VIZI.BlueprintSwitchboard(mapConfig);
switchboardMap.addToWorld(world);

var clock = new VIZI.Clock();

var update = function() {
  var delta = clock.getDelta();

  world.onTick(delta);
  world.render();

  window.requestAnimationFrame(update);
};

update();
