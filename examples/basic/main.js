var world = VIZI.World('world').setView([51.505, -0.09]);

// Add controls
VIZI.Controls.Orbit().addTo(world);

// Not sure if I want to keep this as a public API
//
// Makes sense to allow others to customise their environment so perhaps this
// could be left public but a default is set up within World to simplify things
var environmentLayer = VIZI.EnvironmentLayer().addTo(world);

var gridLayer = VIZI.GridLayer().addTo(world);
