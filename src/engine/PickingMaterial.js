import THREE from 'three';
import PickingShader from './PickingShader';

// FROM: https://github.com/brianxu/GPUPicker/blob/master/GPUPicker.js

var PickingMaterial = function() {
  THREE.ShaderMaterial.call(this, {
    uniforms: {
      size: {
        type: 'f',
        value: 0.01,
      },
      scale: {
        type: 'f',
        value: 400,
      }
    },
    // attributes: ['position', 'id'],
    vertexShader: PickingShader.vertexShader,
    fragmentShader: PickingShader.fragmentShader
  });

  this.linePadding = 2;
};

PickingMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);

PickingMaterial.prototype.constructor = PickingMaterial;

PickingMaterial.prototype.setPointSize = function(size) {
  this.uniforms.size.value = size;
};

PickingMaterial.prototype.setPointScale = function(scale) {
  this.uniforms.scale.value = scale;
};

export default PickingMaterial;
