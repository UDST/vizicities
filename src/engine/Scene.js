import THREE from 'three';

// This can be imported from anywhere and will still reference the same scene,
// though there is a helper reference in Engine.scene

export default (function() {
  var scene = new THREE.Scene();

  // TODO: Re-enable when this works with the skybox
  // scene.fog = new THREE.Fog(0xffffff, 1, 15000);
  return scene;
})();
