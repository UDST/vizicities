import THREE from 'three';

// This can be imported from anywhere and will still reference the same scene,
// though there is a helper reference in Engine.scene

export default (function() {
  var scene = new THREE.Scene();
  return scene;
})();
