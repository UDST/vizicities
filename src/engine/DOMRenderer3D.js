import THREE from 'three';
import {CSS3DRenderer} from '../vendor/CSS3DRenderer';
import DOMScene3D from './DOMScene3D';

// This can only be accessed from Engine.renderer if you want to reference the
// same scene in multiple places

export default function(container) {
  var renderer = new CSS3DRenderer();

  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = 0;

  container.appendChild(renderer.domElement);

  var updateSize = function() {
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', updateSize, false);
  updateSize();

  return renderer;
};
