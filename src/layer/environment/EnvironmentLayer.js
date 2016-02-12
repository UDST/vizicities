import Layer from '../Layer';
import THREE from 'three';

class EnvironmentLayer extends Layer {
  constructor() {
    super();

    this._initLights();
  }

  // Not fleshed out or thought through yet
  //
  // Lights could potentially be put it their own 'layer' to keep this class
  // much simpler and less messy
  _initLights() {
    // Position doesn't really matter (the angle is important), however it's
    // used here so the helpers look more natural.

    var directionalLight = new THREE.DirectionalLight(0x999999);
    directionalLight.intesity = 0.1;
    directionalLight.position.x = 100;
    directionalLight.position.y = 100;
    directionalLight.position.z = 100;

    var directionalLight2 = new THREE.DirectionalLight(0x999999);
    directionalLight2.intesity = 0.1;
    directionalLight2.position.x = -100;
    directionalLight2.position.y = 100;
    directionalLight2.position.z = -100;

    var helper = new THREE.DirectionalLightHelper(directionalLight, 10);
    var helper2 = new THREE.DirectionalLightHelper(directionalLight2, 10);

    this._layer.add(directionalLight);
    this._layer.add(directionalLight2);

    this._layer.add(helper);
    this._layer.add(helper2);
  }
}

// Initialise without requiring new keyword
export default function() {
  return new EnvironmentLayer();
};
