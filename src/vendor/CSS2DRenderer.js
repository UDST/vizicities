// jscs:disable
/* eslint-disable */

/**
 * @author mrdoob / http://mrdoob.com/
 */

import THREE from 'three';

var CSS2DObject = function ( element ) {

	THREE.Object3D.call( this );

	this.element = element;
	this.element.style.position = 'absolute';

	this.addEventListener( 'removed', function ( event ) {

		if ( this.element.parentNode !== null ) {

			this.element.parentNode.removeChild( this.element );

		}

	} );

};

CSS2DObject.prototype = Object.create( THREE.Object3D.prototype );
CSS2DObject.prototype.constructor = CSS2DObject;

//

var CSS2DRenderer = function () {

	console.log( 'THREE.CSS2DRenderer', THREE.REVISION );

	var _width, _height;
	var _widthHalf, _heightHalf;

	var vector = new THREE.Vector3();
	var viewMatrix = new THREE.Matrix4();
	var viewProjectionMatrix = new THREE.Matrix4();

	var frustum = new THREE.Frustum();

	var domElement = document.createElement( 'div' );
	domElement.style.overflow = 'hidden';

	this.domElement = domElement;

	this.setSize = function ( width, height ) {

		_width = width;
		_height = height;

		_widthHalf = _width / 2;
		_heightHalf = _height / 2;

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

	};

	var renderObject = function ( object, camera ) {

		if ( object instanceof CSS2DObject ) {

			vector.setFromMatrixPosition( object.matrixWorld );
			vector.applyProjection( viewProjectionMatrix );

			var element = object.element;
			var style = 'translate(-50%,-50%) translate(' + ( vector.x * _widthHalf + _widthHalf ) + 'px,' + ( - vector.y * _heightHalf + _heightHalf ) + 'px)';

			element.style.WebkitTransform = style;
			element.style.MozTransform = style;
			element.style.oTransform = style;
			element.style.transform = style;

			if ( element.parentNode !== domElement ) {

				domElement.appendChild( element );

			}

			// Hide if outside view frustum
			if (!frustum.containsPoint(object.position)) {
				element.style.display = 'none';
			} else {
				element.style.display = 'block';
			}

		}

		for ( var i = 0, l = object.children.length; i < l; i ++ ) {

			renderObject( object.children[ i ], camera );

		}

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		viewMatrix.copy( camera.matrixWorldInverse.getInverse( camera.matrixWorld ) );
		viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, viewMatrix );

		frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );

		renderObject( scene, camera );

	};

};

export {CSS2DObject as CSS2DObject};
export {CSS2DRenderer as CSS2DRenderer};

THREE.CSS2DObject = CSS2DObject;
THREE.CSS2DRenderer = CSS2DRenderer;
