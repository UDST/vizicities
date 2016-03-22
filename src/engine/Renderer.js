import THREE from 'three';
import Scene from './Scene';

// This can only be accessed from Engine.renderer if you want to reference the
// same scene in multiple places

export default function(container, antialias) {
  var renderer = new THREE.WebGLRenderer({
    antialias: antialias
  });

  // TODO: Re-enable when this works with the skybox
  // renderer.setClearColor(Scene.fog.color, 1);

  renderer.setClearColor(0xffffff, 1);

  // TODO: Re-enable this when perf issues can be solved
  //
  // Rendering double the resolution of the screen can be really slow
  // var pixelRatio = window.devicePixelRatio;
  var pixelRatio = 1;

  renderer.setPixelRatio(pixelRatio);

  // Gamma settings make things look nicer
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMap.enabled = true;

  // TODO: Work out which of the shadowmap types is best
  // https://github.com/mrdoob/three.js/blob/r56/src/Three.js#L107
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // TODO: Check that leaving this as default (CullFrontFace) is right
  // renderer.shadowMap.cullFace = THREE.CullFaceBack;

  container.appendChild(renderer.domElement);

  var updateSize = function() {
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', updateSize, false);
  updateSize();

  return renderer;
};
