import THREE from 'three';
import EffectComposer from '../vendor/EffectComposer';

export default function(renderer, container) {
  var composer = new EffectComposer(renderer);

  var updateSize = function() {
    var pixelRatio = window.devicePixelRatio;
    composer.setSize(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio);
  };

  window.addEventListener('resize', updateSize, false);
  updateSize();

  return composer;
};
