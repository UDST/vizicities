import THREE from 'three';
import Sky from './Sky';
import throttle from 'lodash.throttle';

// TODO: Make sure nothing is left behind in the heap after calling destroy()

var cubemap = {
  vertexShader: [
		'varying vec3 vPosition;',
		'void main() {',
			'vPosition = position;',
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'}'
	].join('\n'),

  fragmentShader: [
    'uniform samplerCube cubemap;',
    'varying vec3 vPosition;',

    'void main() {',
      'gl_FragColor = textureCube(cubemap, normalize(vPosition));',
    '}'
  ].join('\n')
};

class Skybox {
  constructor(world, light) {
    this._world = world;
    this._light = light;

    this._settings = {
      distance: 38000,
      turbidity: 10,
      reileigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      luminance: 1,
      // 0.48 is a cracking dusk / sunset
      // 0.4 is a beautiful early-morning / late-afternoon
      // 0.2 is a nice day time
      inclination: 0.48, // Elevation / inclination
      azimuth: 0.25, // Facing front
    };

    this._initSkybox();
    this._updateUniforms();
    this._initEvents();
  }

  _initEvents() {
    // Throttled to 1 per 100ms
    this._throttledWorldUpdate = throttle(this._update, 100);
    this._world.on('preUpdate', this._throttledWorldUpdate, this);
  }

  _initSkybox() {
    // Cube camera for skybox
    this._cubeCamera = new THREE.CubeCamera(1, 20000000, 128);

    // Cube material
    var cubeTarget = this._cubeCamera.renderTarget;

    // Add Sky Mesh
    this._sky = new Sky();
    this._skyScene = new THREE.Scene();
    this._skyScene.add(this._sky.mesh);

    // Add Sun Helper
    this._sunSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(2000, 16, 8),
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    );

    // TODO: This isn't actually visible because it's not added to the layer
    // this._sunSphere.visible = true;

    var skyboxUniforms = {
      cubemap: { type: 't', value: cubeTarget }
    };

    var skyboxMat = new THREE.ShaderMaterial({
      uniforms: skyboxUniforms,
      vertexShader: cubemap.vertexShader,
      fragmentShader: cubemap.fragmentShader,
      side: THREE.BackSide
    });

    this._mesh = new THREE.Mesh(new THREE.BoxGeometry(1900000, 1900000, 1900000), skyboxMat);

    this._updateSkybox = true;
  }

  _updateUniforms() {
    var settings = this._settings;
    var uniforms = this._sky.uniforms;
    uniforms.turbidity.value = settings.turbidity;
    uniforms.reileigh.value = settings.reileigh;
    uniforms.luminance.value = settings.luminance;
    uniforms.mieCoefficient.value = settings.mieCoefficient;
    uniforms.mieDirectionalG.value = settings.mieDirectionalG;

    var theta = Math.PI * (settings.inclination - 0.5);
    var phi = 2 * Math.PI * (settings.azimuth - 0.5);

    this._sunSphere.position.x = settings.distance * Math.cos(phi);
    this._sunSphere.position.y = settings.distance * Math.sin(phi) * Math.sin(theta);
    this._sunSphere.position.z = settings.distance * Math.sin(phi) * Math.cos(theta);

    // Move directional light to sun position
    this._light.position.copy(this._sunSphere.position);

    this._sky.uniforms.sunPosition.value.copy(this._sunSphere.position);
  }

  _update(delta) {
    if (this._updateSkybox) {
      this._updateSkybox = false;
    } else {
      return;
    }

    // if (!this._angle) {
    //   this._angle = 0;
    // }
    //
    // // Animate inclination
    // this._angle += Math.PI * delta;
    // this._settings.inclination = 0.5 * (Math.sin(this._angle) / 2 + 0.5);

    // Update light intensity depending on elevation of sun (day to night)
    this._light.intensity = 1 - 0.95 * (this._settings.inclination / 0.5);

    // // console.log(delta, this._angle, this._settings.inclination);
    //
    // TODO: Only do this when the uniforms have been changed
    this._updateUniforms();

    // TODO: Only do this when the cubemap has actually changed
    this._cubeCamera.updateCubeMap(this._world._engine._renderer, this._skyScene);
  }

  getRenderTarget() {
    return this._cubeCamera.renderTarget;
  }

  setInclination(inclination) {
    this._settings.inclination = inclination;
    this._updateSkybox = true;
  }

  // Destroy the skybox and remove it from memory
  destroy() {
    this._world.off('preUpdate', this._throttledWorldUpdate);
    this._throttledWorldUpdate = null;

    this._world = null;
    this._light = null;

    this._cubeCamera = null;

    this._sky.mesh.geometry.dispose();
    this._sky.mesh.geometry = null;

    if (this._sky.mesh.material.map) {
      this._sky.mesh.material.map.dispose();
      this._sky.mesh.material.map = null;
    }

    this._sky.mesh.material.dispose();
    this._sky.mesh.material = null;

    this._sky.mesh = null;
    this._sky = null;

    this._skyScene = null;

    this._sunSphere.geometry.dispose();
    this._sunSphere.geometry = null;

    if (this._sunSphere.material.map) {
      this._sunSphere.material.map.dispose();
      this._sunSphere.material.map = null;
    }

    this._sunSphere.material.dispose();
    this._sunSphere.material = null;

    this._sunSphere = null;

    this._mesh.geometry.dispose();
    this._mesh.geometry = null;

    if (this._mesh.material.map) {
      this._mesh.material.map.dispose();
      this._mesh.material.map = null;
    }

    this._mesh.material.dispose();
    this._mesh.material = null;
  }
}

export default Skybox;

var noNew = function(world, light) {
  return new Skybox(world, light);
};

// Initialise without requiring new keyword
export {noNew as skybox};
