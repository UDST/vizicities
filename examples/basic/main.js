var world = VIZI.World('world').setView([51.505, -0.09]);

// Add controls
VIZI.Controls.Orbit().addTo(world);

// Not sure if I want to keep this as a public API
//
// Makes sense to allow others to customise their environment so perhaps this
// could be left public but a default is set up within World to simplify things
var environmentLayer = VIZI.EnvironmentLayer().addTo(world);

// // http://{s}.tile.osm.org/{z}/{x}/{y}.png
// // http://{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png
var imageTileLayer = VIZI.ImageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

var topoJSONTileLayer = VIZI.TopoJSONTileLayer('https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);
