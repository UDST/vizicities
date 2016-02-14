import LatLon from '../../geo/LatLon';
import THREE from 'three';

var r2d = 180 / Math.PI;

var loader = new THREE.TextureLoader();
loader.setCrossOrigin('');

class Surface {
  constructor(quadkey, world) {
    this.world = world;
    this.quadkey = quadkey;
    this.tile = this._quadkeyToTile(quadkey);
    this.bounds = this._tileBounds(this.tile);
    this.center = this._boundsToCenter(this.bounds);
    this.side = (new THREE.Vector3(this.bounds[0], 0, this.bounds[3])).sub(new THREE.Vector3(this.bounds[0], 0, this.bounds[1])).length();

    this.mesh = this._createMesh();
  }

  _createDebugMesh() {
    var canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;

    var context = canvas.getContext('2d');
    context.font = 'Bold 60px Courier';
    context.fillStyle = 'rgba(255,0,0,1)';
    context.fillText(this.quadkey, 100, 530);

    var texture = new THREE.Texture(canvas);

    // Silky smooth images when tilted
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    // TODO: Set this to renderer.getMaxAnisotropy() / 4
    texture.anisotropy = 4;

    texture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true
    });

    var geom = new THREE.PlaneGeometry(this.side, this.side, 1);
    var mesh = new THREE.Mesh(geom, material);

    mesh.rotation.x = -90 * Math.PI / 180;
    mesh.position.y = 0.1;

    this.mesh.add(mesh);
  }

  _createMesh() {
    var mesh = new THREE.Object3D();
    var geom = new THREE.PlaneGeometry(this.side, this.side, 1);

    var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    var url = 'http://' + letter + '.basemaps.cartocdn.com/light_nolabels/';
    // var url = 'http://tile.stamen.com/toner-lite/';

    loader.load(url + this.tile[2] + '/' + this.tile[0] + '/' + this.tile[1] + '@2x.png', texture => {
      console.log('Loaded');
      // Silky smooth images when tilted
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipMapLinearFilter;

      // TODO: Set this to renderer.getMaxAnisotropy() / 4
      texture.anisotropy = 4;

      texture.needsUpdate = true;

      var material = new THREE.MeshBasicMaterial({map: texture});

      var localMesh = new THREE.Mesh(geom, material);
      localMesh.rotation.x = -90 * Math.PI / 180;

      // Sometimes tiles don't appear, even though the images have loaded ok
      // This helps a little but it's a total hack and the real solution needs
      // to be found.
      setTimeout(function() {
        mesh.add(localMesh);
      }, 2000);

      mesh.position.x = this.center[0];
      mesh.position.z = this.center[1];

      var box = new THREE.BoxHelper(localMesh);
      mesh.add(box);

      this._createDebugMesh();
    });

    return mesh;
  }

  _quadkeyToTile(quadkey) {
    var x = 0;
    var y = 0;
    var z = quadkey.length;

    for (var i = z; i > 0; i--) {
      var mask = 1 << (i - 1);
      var q = +quadkey[z - i];
      if (q === 1) {
        x |= mask;
      }
      if (q === 2) {
        y |= mask;
      }
      if (q === 3) {
        x |= mask;
        y |= mask;
      }
    }

    return [x, y, z];
  }

  _boundsToCenter(bounds) {
    var x = bounds[0] + (bounds[2] - bounds[0]) / 2;
    var y = bounds[1] + (bounds[3] - bounds[1]) / 2;

    return [x, y];
  }

  _tileBounds(tile) {
    var boundsWGS84 = this._tileBoundsWGS84(tile);

    var sw = this.world.latLonToPoint(LatLon(boundsWGS84[1], boundsWGS84[0]));
    var ne = this.world.latLonToPoint(LatLon(boundsWGS84[3], boundsWGS84[2]));

    return [sw.x, sw.y, ne.x, ne.y];
    // return [swMerc[0], -swMerc[1], neMerc[0], -neMerc[1]];
  }

  _tileBoundsWGS84(tile) {
    var e = this._tile2lon(tile[0] + 1, tile[2]);
    var w = this._tile2lon(tile[0], tile[2]);
    var s = this._tile2lat(tile[1] + 1, tile[2]);
    var n = this._tile2lat(tile[1], tile[2]);
    return [w, s, e, n];
  }

  _tile2lon(x, z) {
    return x / Math.pow(2, z) * 360 - 180;
  }

  _tile2lat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return r2d * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }
}

// Initialise without requiring new keyword
export default function(quadkey, world) {
  return new Surface(quadkey, world);
};
