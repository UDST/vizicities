import THREE from 'three';

// This can only be accessed from Engine.camera if you want to reference the
// same scene in multiple places

// TODO: Ensure that FOV looks natural on all aspect ratios
// http://stackoverflow.com/q/26655930/997339

export default function(container) {
  var camera = new THREE.PerspectiveCamera(45, 1, 1, 2000000);
  camera.position.y = 4000;
  camera.position.z = 4000;

  var updateSize = function() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  };

  window.addEventListener('resize', updateSize, false);
  updateSize();

  return camera;
};
