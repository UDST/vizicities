import THREE from 'three';
import Scene from './Scene';

// This can only be accessed from Engine.renderer if you want to reference the
// same scene in multiple places

export default function(container) {
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  // TODO: Re-enable when this works with the skybox
  // renderer.setClearColor(Scene.fog.color, 1);

  renderer.setClearColor(0xffffff, 1);

  // Gamma settings make things look nicer
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.cullFace = THREE.CullFaceBack;

  container.appendChild(renderer.domElement);

  var updateSize = function() {
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', updateSize, false);
  updateSize();

  return renderer;
};
