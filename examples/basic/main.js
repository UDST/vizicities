var world = VIZI.World('world');

// Not sure if I want to keep this as a public API
//
// Makes sense to allow others to customise their environment so perhaps this
// could be left public but a default is set up within World to simplify things
var environment = VIZI.EnvironmentLayer().addTo(world);
