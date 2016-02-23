import THREE from 'three';
import Sky from './Sky';
import throttle from 'lodash.throttle';

// TODO: Sync a directional light with sun position

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
      distance: 400000,
      turbidity: 10,
      reileigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      luminance: 1,
      inclination: 0.1, // elevation / inclination
      azimuth: 0.25, // Facing front,
      sun: !true
    };

    this._initSkybox();
    this._updateUniforms();

    this._initEvents();
  }

  _initEvents() {
    // Run LOD calculations based on render calls
    //
    // Throttled to 1 LOD calculation per 100ms
    this._throttledWorldUpdate = throttle(this._update, 100);

    this._world.on('preUpdate', this._throttledWorldUpdate, this);
  }

  _initSkybox() {
    // Cube camera for skybox
    this._cubeCamera = new THREE.CubeCamera(1, 2000000, 128);

    // Cube material
    var cubeTarget = this._cubeCamera.renderTarget;

    // Add Sky Mesh
    this._sky = new Sky();
    this._skyScene = new THREE.Scene();
    this._skyScene.add(this._sky.mesh);

    // Add Sun Helper
    this._sunSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(20000, 16, 8),
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    );
    this._sunSphere.position.y = -700000;
    this._sunSphere.visible = false;

    // // --------------------------------------------------------
    // // Irradiance level 1
    // // --------------------------------------------------------
    // var irrLvl1Uniforms = {
    //   cubemap: { type: "t", value: cubeTarget },
    //   axis: { type: "v3", value: new THREE.Vector3( 1, 0, 0 ) }
    // };
    //
    // var irrLvl1Mat = new THREE.ShaderMaterial({
    //   uniforms: irrLvl1Uniforms,
    //   vertexShader: document.getElementById( 'downsample_vertex_shader' ).textContent,
    //   fragmentShader: document.getElementById( 'downsample_fragment_shader' ).textContent,
    //   side: THREE.BackSide
    // });
    //
    // var irrLvl1CubeCamera = new THREE.CubeCamera( 1, 2000000, 64 );
    //
    // var irrLvl1Mesh = new THREE.Mesh( new THREE.BoxGeometry(2000000, 2000000, 2000000), irrLvl1Mat);
    // skyScene.add(irrLvl1Mesh);
    //
    // // --------------------------------------------------------
    // // Irradiance level 2
    // // --------------------------------------------------------
    // var irrLvl2Uniforms = {
    //   cubemap: { type: "t", value: irrLvl1CubeCamera.renderTarget },
    //   axis: { type: "v3", value: new THREE.Vector3( 0, 0, 1 ) }
    // };
    //
    // var irrLvl2Mat = new THREE.ShaderMaterial({
    //   uniforms: irrLvl2Uniforms,
    //   vertexShader: document.getElementById( 'downsample_vertex_shader' ).textContent,
    //   fragmentShader: document.getElementById( 'downsample_fragment_shader' ).textContent,
    //   side: THREE.BackSide
    // });
    //
    // var irrLvl2CubeCamera = new THREE.CubeCamera( 1, 2000000, 64 );
    //
    // var irrLvl2Mesh = new THREE.Mesh( new THREE.BoxGeometry(2000000, 2000000, 2000000), irrLvl2Mat);
    // skyScene.add(irrLvl2Mesh);
    //
    // // --------------------------------------------------------
    // // Irradiance level 3
    // // --------------------------------------------------------
    // var irrLvl3Uniforms = {
    //   cubemap: { type: "t", value: irrLvl2CubeCamera.renderTarget },
    //   axis: { type: "v3", value: new THREE.Vector3( 0, 1, 0 ) }
    // };
    //
    // var irrLvl3Mat = new THREE.ShaderMaterial({
    //   uniforms: irrLvl3Uniforms,
    //   vertexShader: document.getElementById( 'downsample_vertex_shader' ).textContent,
    //   fragmentShader: document.getElementById( 'downsample_fragment_shader' ).textContent,
    //   side: THREE.BackSide
    // });
    //
    // var irrLvl3CubeCamera = new THREE.CubeCamera( 1, 2000000, 64 );
    //
    // var irrLvl3Mesh = new THREE.Mesh( new THREE.BoxGeometry(2000000, 2000000, 2000000), irrLvl3Mat);
    // skyScene.add(irrLvl3Mesh);

    // Skybox in real scene
    var skyboxUniforms = {
      cubemap: { type: 't', value: cubeTarget }
    };

    var skyboxMat = new THREE.ShaderMaterial({
      uniforms: skyboxUniforms,
      vertexShader: cubemap.vertexShader,
      fragmentShader: cubemap.fragmentShader,
      side: THREE.BackSide
    });

    this._mesh = new THREE.Mesh(new THREE.BoxGeometry(40000, 40000, 40000), skyboxMat);
    // this._mesh = this._sky.mesh;
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
    if (!this._done) {
      this._done = true;
    } else {
      return;
    }

    // if (!this._angle) {
    //   this._angle = 0;
    // }

    // Animate inclination
    // this._angle += Math.PI * delta;
    // this._settings.inclination = 0.5 * (Math.sin(this._angle) / 2 + 0.5);

    // Update light intensity depending on elevation of sun (day to night)
    this._light.intensity = 1 - 0.95 * (this._settings.inclination / 0.5);

    // console.log(delta, this._angle, this._settings.inclination);

    // TODO: Only do this when the uniforms have been changed
    // this._updateUniforms();

    // TODO: Only do this when the cubemap has actually changed
    this._cubeCamera.updateCubeMap(this._world._engine._renderer, this._skyScene);
  }

  // Destroy the skybox and remove it from memory
  destroy() {
  }
}

// Initialise without requiring new keyword
export default function(world, light) {
  return new Skybox(world, light);
};
