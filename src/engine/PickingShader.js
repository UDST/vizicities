// FROM: https://github.com/brianxu/GPUPicker/blob/master/GPUPicker.js

var PickingShader = {
  vertexShader: [
		'attribute float pickingId;',
		// '',
		// 'uniform float size;',
		// 'uniform float scale;',
		'',
		'varying vec4 worldId;',
		'',
		'void main() {',
		'  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
		// '  gl_PointSize = size * ( scale / length( mvPosition.xyz ) );',
		'  vec3 a = fract(vec3(1.0/255.0, 1.0/(255.0*255.0), 1.0/(255.0*255.0*255.0)) * pickingId);',
		'  a -= a.xxy * vec3(0.0, 1.0/255.0, 1.0/255.0);',
		'  worldId = vec4(a,1);',
		'  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'}'
	].join('\n'),

  fragmentShader: [
		'#ifdef GL_ES\n',
		'precision highp float;\n',
		'#endif\n',
		'',
		'varying vec4 worldId;',
		'',
		'void main() {',
		'  gl_FragColor = worldId;',
		'}'
	].join('\n')
};

export default PickingShader;
