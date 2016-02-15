import THREE from 'three';

// This can only be accessed from Engine.camera if you want to reference the
// same scene in multiple places

export default function(container) {
  var camera = new THREE.PerspectiveCamera(40, 1, 1, 40000);
  camera.position.y = 400;
  camera.position.z = 400;

  var updateSize = function() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  };

  window.addEventListener('resize', updateSize, false);
  updateSize();

  return camera;
};
