import THREE from 'three';
import EffectComposer from '../vendor/EffectComposer';

export default function(renderer, container) {
  var composer = new EffectComposer(renderer);

  var updateSize = function() {
    composer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', updateSize, false);
  updateSize();

  return composer;
};
