
// Custom VIZI.Scene

var CustomScene = function(options) {
  this.scene = new THREE.Scene();
  this.t = 0.0;
};

CustomScene.prototype = Object.create( VIZI.Scene.prototype );

CustomScene.prototype.init = function(options) {
  this.directionalLight = new THREE.DirectionalLight("rgb(200,200,200)", 1);
  this.directionalLight.position.set(1,0.5,-0.5);

  this.pointLight = new THREE.PointLight("red", 10, 300);
  this.pointLight.position.set(-200, 100, 200);

  this.indicatorMesh = new THREE.Mesh(
    new THREE.SphereGeometry(30, 32, 32),
    new THREE.MeshLambertMaterial({ color : "red" })
  );

  this.add(this.directionalLight);
  this.add(this.pointLight);
  this.add(this.indicatorMesh);
};

CustomScene.prototype.add = function(object) {
  this.scene.add(object);
};

CustomScene.prototype.remove = function(object) {
  this.scene.remove(object);
};

CustomScene.prototype.onTick = function(delta) {
  this.t += delta / 10;
  if (this.t <= 1.0) {
    this.pointLight.position.copy(new THREE.Vector3(-200, 100, 200).lerp(new THREE.Vector3(200, 150, -200), this.t));
  }
  else {
    this.pointLight.position.set(-200, 100, 200);
    this.t = 0.0;
  }
  this.indicatorMesh.position.copy(this.pointLight.position);
};

// Initilize VIZI.World with customizations

var world = new VIZI.World({
  viewport: document.querySelector("#vizicities-viewport"),
  scene: new CustomScene(),
  renderer: { antialias : true }
});

var controls = new VIZI.ControlsMap(world.camera);

var mapConfig = {
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

var buildingsConfig = {
  input: {
    type: "BlueprintInputGeoJSON",
    options: {
      tilePath: "http://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.json"
    }
  },
  output: {
    type: "BlueprintOutputBuildingTiles",
    options: {
      grids: [{
        zoom: 15,
        tilesPerDirection: 1,
        cullZoom: 13
      }],
      workerURL: "../../build/vizi-worker.min.js"
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
    triggerArguments: ["geoJSON", "tile"],
    actionObject: "output",
    actionName: "outputBuildingTile",
    actionArguments: ["buildings", "tile"],
    actionOutput: {
      buildings: {
        process: "map",
        itemsObject: "geoJSON",
        itemsProperties: "features",
        transformation: {
          outline: "geometry.coordinates",
          height: "properties.height"
        }
      },
      tile: "tile"
    }
  }]
};

var switchboardBuildings = new VIZI.BlueprintSwitchboard(buildingsConfig);
switchboardBuildings.addToWorld(world);

var clock = new VIZI.Clock();

var update = function() {
  var delta = clock.getDelta();
  world.onTick(delta);
  world.scene.onTick(delta);
  world.render();

  window.requestAnimationFrame(update);
};

update();