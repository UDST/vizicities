import THREE from 'three';
import EffectComposer from '../vendor/EffectComposer';

export default function(renderer, container) {
  var composer = new EffectComposer(renderer);

  var updateSize = function() {
    // TODO: Re-enable this when perf issues can be solved
    //
    // Rendering double the resolution of the screen can be really slow
    // var pixelRatio = window.devicePixelRatio;
    var pixelRatio = 1;

    composer.setSize(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio);
  };

  window.addEventListener('resize', updateSize, false);
  updateSize();

  return composer;
};
