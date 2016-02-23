import THREE from 'three';

export default function(colour, skybox) {
  var canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  var context = canvas.getContext('2d');
  context.fillStyle = colour;
  context.fillRect(0, 0, canvas.width, canvas.height);
  // context.strokeStyle = '#D0D0CF';
  // context.strokeRect(0, 0, canvas.width, canvas.height);

  var texture = new THREE.Texture(canvas);

  // // Silky smooth images when tilted
  // texture.magFilter = THREE.LinearFilter;
  // texture.minFilter = THREE.LinearMipMapLinearFilter;
  // //
  // // // TODO: Set this to renderer.getMaxAnisotropy() / 4
  // texture.anisotropy = 4;

  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set(segments, segments);

  texture.needsUpdate = true;

  // var material = new THREE.MeshBasicMaterial({
  //   map: texture,
  //   depthWrite: false
  // });

  var material = new THREE.MeshStandardMaterial({
    depthWrite: false
  });
  material.roughness = 1;
  material.metalness = 0.2;
  material.envMap = skybox;

  return material;
};
