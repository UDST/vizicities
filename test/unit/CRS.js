import extend from 'lodash.assign';
import CRS from '../../src/geo/crs/index';

describe('CRS.EPSG3857', () => {
  var crs = CRS.EPSG3857;

  describe('#code', () => {
    it('returns the correct code', () => {
      expect(crs.code).to.equal('EPSG:3857');
    });
  });

  describe('#latLonToPoint', () => {
    it('projects the center', () => {
      var point = crs.latLonToPoint([0, 0]);

      expect(point[0]).to.be.closeTo(0, 0.01);
      expect(point[1]).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([85.0511287798, -180]);

      expect(point[0]).to.be.closeTo(-scaleFactor, 0.01);
      expect(point[1]).to.be.closeTo(-scaleFactor, 0.01);
    });

    it('projects the South-East corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([-85.0511287798, 180]);

      expect(point[0]).to.be.closeTo(scaleFactor, 0.01);
      expect(point[1]).to.be.closeTo(scaleFactor, 0.01);
    });

    it('projects using pixels if zoom is given', () => {
      var point = crs.latLonToPoint([-85.0511287798, 180], 1);

      expect(point[0]).to.be.closeTo(256, 0.01);
      expect(point[1]).to.be.closeTo(256, 0.01);
    });
  });

  describe('#pointToLatLon', () => {
    it('unprojects the center', () => {
      var latlon = crs.pointToLatLon([0, 0]);

      expect(latlon[0]).to.be.closeTo(0, 0.01);
      expect(latlon[1]).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var scaleFactor = crs.scaleFactor;
      var latlon = crs.pointToLatLon([-scaleFactor, -scaleFactor]);

      expect(latlon[0]).to.be.closeTo(85.0511287798, 0.01);
      expect(latlon[1]).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var scaleFactor = crs.scaleFactor;
      var latlon = crs.pointToLatLon([scaleFactor, scaleFactor]);

      expect(latlon[0]).to.be.closeTo(-85.0511287798, 0.01);
      expect(latlon[1]).to.be.closeTo(180, 0.01);
    });

    it('unprojects using pixels if zoom is given', () => {
      var latlon = crs.pointToLatLon([256, 256], 1);

      expect(latlon[0]).to.be.closeTo(-85.0511287798, 0.01);
      expect(latlon[1]).to.be.closeTo(180, 0.01);

      latlon = crs.pointToLatLon([0, 0], 1);

      expect(latlon[0]).to.be.closeTo(0, 0.01);
      expect(latlon[1]).to.be.closeTo(0, 0.01);
    });
  });

  describe('#project', () => {
    it('projects the center', () => {
      var point = crs.project([0, 0]);

      expect(point[0]).to.be.closeTo(0, 0.01);
      expect(point[1]).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var point = crs.project([85.0511287798, -180]);

      expect(point[0]).to.be.closeTo(-20037508.34279, 0.01);
      expect(point[1]).to.be.closeTo(20037508.34278, 0.01);
    });

    it('projects the South-East corner', () => {
      var point = crs.project([-85.0511287798, 180]);

      expect(point[0]).to.be.closeTo(20037508.34278, 0.01);
      expect(point[1]).to.be.closeTo(-20037508.34278, 0.01);
    });

    it('caps the maximum latitude', () => {
      var point = crs.project([-90, 180]);

      expect(point[0]).to.be.closeTo(20037508.34278, 0.01);
      expect(point[1]).to.be.closeTo(-20037508.34278, 0.01);
    });
  });

  describe('#unproject', () => {
    it('unprojects the center', () => {
      var latlon = crs.unproject([0, 0]);

      expect(latlon[0]).to.be.closeTo(0, 0.01);
      expect(latlon[1]).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var latlon = crs.unproject([-20037508.34278, 20037508.34278]);

      expect(latlon[0]).to.be.closeTo(85.0511287798, 0.01);
      expect(latlon[1]).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var latlon = crs.unproject([20037508.34278, -20037508.34278]);

      expect(latlon[0]).to.be.closeTo(-85.0511287798, 0.01);
      expect(latlon[1]).to.be.closeTo(180, 0.01);
    });
  });

  describe('#scale', () => {
    it('uses the scale factor by default', () => {
      var scale = crs.scale();
      expect(scale).to.equal(crs.scaleFactor);
    });

    it('uses the zoom level if provided', () => {
      var scale = crs.scale(1);
      expect(scale).to.equal(512);
    });
  });

  describe('#zoom', () => {
    it('returns zoom level for given scale', () => {
      var scale = 512;
      var zoom = crs.zoom(scale);

      expect(zoom).to.equal(1);
    });
  });

  describe('#getProjectedBounds', () => {
    it('returns correct bounds without zoom', () => {
      var scaleFactor2 = crs.scaleFactor * 2;
      var bounds = crs.getProjectedBounds();

      expect(Math.abs(bounds[1][0] - bounds[0][0])).to.be.closeTo(scaleFactor2, 0.1);
      expect(Math.abs(bounds[1][1] - bounds[0][1])).to.be.closeTo(scaleFactor2, 0.1);
    });

    it('returns correct bounds with zoom', () => {
      var bounds = crs.getProjectedBounds(1);

      expect(Math.abs(bounds[1][0] - bounds[0][0])).to.be.closeTo(512, 0.1);
      expect(Math.abs(bounds[1][1] - bounds[0][1])).to.be.closeTo(512, 0.1);
    });
  });

  describe('#wrapLatLon', () => {
    it('wraps longitude between -180 and 180 by default', () => {
      expect(crs.wrapLatLon([0, 190])[1]).to.equal(-170);
      expect(crs.wrapLatLon([0, 360])[1]).to.equal(0);

      expect(crs.wrapLatLon([0, -190])[1]).to.equal(170);
      expect(crs.wrapLatLon([0, -360])[1]).to.equal(0);

      expect(crs.wrapLatLon([0, 0])[1]).to.equal(0);
      expect(crs.wrapLatLon([0, 180])[1]).to.equal(180);
    });

    it('keeps altitude value', () => {
      expect(crs.wrapLatLon([0, 190, 100])[1]).to.equal(-170);
      expect(crs.wrapLatLon([0, 190, 100])[2]).to.equal(100);
    });
  });

  describe('#distance', () => {
    it('returns correct distance using cosine law approximation', () => {
      expect(crs.distance([0, 0], [0.001, 0])).to.be.closeTo(111.31949492321543, 0.1);
    });

    it('returns correct distance using Haversine', () => {
      expect(crs.distance([0, 0], [0.001, 0], true)).to.be.closeTo(111.3194907932736, 0.1);
    });
  });

  describe('#pointScale', () => {
    var pointScale;

    it('returns approximate point scale factor', () => {
      pointScale = crs.pointScale([0, 0]);

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1, 0.1);

      pointScale = crs.pointScale([60, 0]);

      expect(pointScale[0]).to.be.closeTo(1.9999999999999996, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.9999999999999996, 0.1);
    });

    it('returns accurate point scale factor', () => {
      pointScale = crs.pointScale([0, 0], true);

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.0067394967683778, 0.1);

      pointScale = crs.pointScale([60, 0], true);

      expect(pointScale[0]).to.be.closeTo(1.994972897047054, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.9983341753952164, 0.1);
    });
  });

  describe('#metresToProjected', () => {
    var pointScale;

    it('returns correct projected units', () => {
      pointScale = crs.pointScale([0, 0]);
      expect(crs.metresToProjected(1, pointScale)).to.be.closeTo(1, 0.1);

      pointScale = crs.pointScale([60, 0]);
      expect(crs.metresToProjected(1, pointScale)).to.be.closeTo(1.9999999999999996, 0.1);
    });
  });

  describe('#projectedToMetres', () => {
    var pointScale;

    it('returns correct real metres', () => {
      pointScale = crs.pointScale([0, 0]);
      expect(crs.projectedToMetres(1, pointScale)).to.be.closeTo(1, 0.1);

      pointScale = crs.pointScale([60, 0]);
      expect(crs.projectedToMetres(1.9999999999999996, pointScale)).to.be.closeTo(1, 0.1);
    });
  });

  // These two are combined as it is hard to write an invidual test that can
  // be specified without knowing or redifining crs.scaleFactor
  describe('#metresToWorld & #worldToMetres', () => {
    var pointScale;
    var worldUnits;
    var metres;

    it('returns correct world units', () => {
      pointScale = crs.pointScale([0, 0]);
      worldUnits = crs.metresToWorld(1, pointScale);
      metres = crs.worldToMetres(worldUnits, pointScale);

      expect(metres).to.be.closeTo(1, 0.1);

      pointScale = crs.pointScale([60, 0]);
      worldUnits = crs.metresToWorld(1, pointScale);
      metres = crs.worldToMetres(worldUnits, pointScale);

      expect(metres).to.be.closeTo(1, 0.1);
    });

    it('returns correct world units using zoom', () => {
      pointScale = crs.pointScale([0, 0]);
      worldUnits = crs.metresToWorld(40075016.68556, pointScale, 1);

      expect(worldUnits).to.be.closeTo(512, 0.1);

      pointScale = crs.pointScale([60, 0]);
      worldUnits = crs.metresToWorld(40075016.68556, pointScale, 1);

      expect(worldUnits).to.be.closeTo(512, 0.1);
    });

    it('returns correct metres using zoom', () => {
      pointScale = crs.pointScale([0, 0]);
      worldUnits = crs.worldToMetres(512, pointScale, 1);

      expect(worldUnits).to.be.closeTo(40075016.68556, 0.1);

      pointScale = crs.pointScale([60, 0]);
      worldUnits = crs.worldToMetres(512, pointScale, 1);

      expect(worldUnits).to.be.closeTo(40075016.68556, 0.1);
    });
  });
});

// Only test for code as the rest is identical to CRS.EPSG3857
describe('CRS.EPSG900913', () => {
  var crs = CRS.EPSG900913;

  describe('#code', () => {
    it('returns the correct code', () => {
      expect(crs.code).to.equal('EPSG:900913');
    });
  });
});

// Basic tests for projection-specific stuff as the rest is likely ok given
// correct projected / unprojected values
describe('CRS.3395', () => {
  var crs = CRS.EPSG3395;

  describe('#code', () => {
    it('returns the correct code', () => {
      expect(crs.code).to.equal('EPSG:3395');
    });
  });

  describe('#latLonToPoint', () => {
    it('projects the center', () => {
      var point = crs.latLonToPoint([0, 0]);

      expect(point[0]).to.be.closeTo(0, 0.01);
      expect(point[1]).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([85.0840591556, -180]);

      expect(point[0]).to.be.closeTo(-scaleFactor, 0.01);
      expect(point[1]).to.be.closeTo(-scaleFactor, 0.01);
    });

    it('projects the South-East corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([-85.0840591556, 180]);

      expect(point[0]).to.be.closeTo(scaleFactor, 0.01);
      expect(point[1]).to.be.closeTo(scaleFactor, 0.01);
    });

    it('projects using pixels if zoom is given', () => {
      var point = crs.latLonToPoint([-85.0840591556, 180], 1);

      expect(point[0]).to.be.closeTo(256, 0.01);
      expect(point[1]).to.be.closeTo(256, 0.01);
    });
  });

  describe('#pointToLatLon', () => {
    it('unprojects the center', () => {
      var latlon = crs.pointToLatLon([0, 0]);

      expect(latlon[0]).to.be.closeTo(0, 0.01);
      expect(latlon[1]).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var scaleFactor = crs.scaleFactor;
      var latlon = crs.pointToLatLon([-scaleFactor, -scaleFactor]);

      expect(latlon[0]).to.be.closeTo(85.0840591556, 0.01);
      expect(latlon[1]).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var scaleFactor = crs.scaleFactor;
      var latlon = crs.pointToLatLon([scaleFactor, scaleFactor]);

      expect(latlon[0]).to.be.closeTo(-85.0840591556, 0.01);
      expect(latlon[1]).to.be.closeTo(180, 0.01);
    });

    it('unprojects using pixels if zoom is given', () => {
      var latlon = crs.pointToLatLon([256, 256], 1);

      expect(latlon[0]).to.be.closeTo(-85.0840591556, 0.01);
      expect(latlon[1]).to.be.closeTo(180, 0.01);

      latlon = crs.pointToLatLon([0, 0], 1);

      expect(latlon[0]).to.be.closeTo(0, 0.01);
      expect(latlon[1]).to.be.closeTo(0, 0.01);
    });
  });
});

// Basic tests for projection-specific stuff as the rest is likely ok given
// correct projected / unprojected values
describe('CRS.4326', () => {
  var crs = CRS.EPSG4326;

  describe('#code', () => {
    it('returns the correct code', () => {
      expect(crs.code).to.equal('EPSG:4326');
    });
  });

  describe('#latLonToPoint', () => {
    it('projects the center', () => {
      var point = crs.latLonToPoint([0, 0]);

      expect(point[0]).to.be.closeTo(0, 0.01);
      expect(point[1]).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([90, -180]);

      expect(point[0]).to.be.closeTo(-scaleFactor, 0.01);

      // Half scale factor as projection is not square
      expect(point[1]).to.be.closeTo(-scaleFactor / 2, 0.01);
    });

    it('projects the South-East corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([-90, 180]);

      expect(point[0]).to.be.closeTo(scaleFactor, 0.01);

      // Half scale factor as projection is not square
      expect(point[1]).to.be.closeTo(scaleFactor / 2, 0.01);
    });

    it('projects using pixels if zoom is given', () => {
      var point = crs.latLonToPoint([-90, 180], 1);

      expect(point[0]).to.be.closeTo(256, 0.01);

      // Half width as projection is not square
      expect(point[1]).to.be.closeTo(128, 0.01);
    });
  });

  describe('#pointToLatLon', () => {
    it('unprojects the center', () => {
      var latlon = crs.pointToLatLon([0, 0]);

      expect(latlon[0]).to.be.closeTo(0, 0.01);
      expect(latlon[1]).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var scaleFactor = crs.scaleFactor;
      var latlon = crs.pointToLatLon([-scaleFactor, -scaleFactor / 2]);

      expect(latlon[0]).to.be.closeTo(90, 0.01);
      expect(latlon[1]).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var scaleFactor = crs.scaleFactor;
      var latlon = crs.pointToLatLon([scaleFactor, scaleFactor / 2]);

      expect(latlon[0]).to.be.closeTo(-90, 0.01);
      expect(latlon[1]).to.be.closeTo(180, 0.01);
    });

    it('unprojects using pixels if zoom is given', () => {
      var latlon = crs.pointToLatLon([256, 128], 1);

      expect(latlon[0]).to.be.closeTo(-90, 0.01);
      expect(latlon[1]).to.be.closeTo(180, 0.01);

      latlon = crs.pointToLatLon([0, 0], 1);

      expect(latlon[0]).to.be.closeTo(0, 0.01);
      expect(latlon[1]).to.be.closeTo(0, 0.01);
    });
  });
});

// Basic tests for projection-specific stuff as the rest is likely ok given
// correct projected / unprojected values
describe('CRS.Simple', () => {
  var crs = CRS.Simple;

  describe('#latLonToPoint', () => {
    it('projects the center', () => {
      var point = crs.latLonToPoint([0, 0]);

      expect(point[0]).to.be.closeTo(0, 0.01);
      expect(point[1]).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([-500, -500]);

      expect(point[0]).to.be.closeTo(-500, 0.01);
      expect(point[1]).to.be.closeTo(-500, 0.01);
    });

    it('projects the South-East corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([500, 500]);

      expect(point[0]).to.be.closeTo(500, 0.01);
      expect(point[1]).to.be.closeTo(500, 0.01);
    });
  });

  describe('#pointToLatLon', () => {
    it('unprojects the center', () => {
      var latlon = crs.pointToLatLon([0, 0]);

      expect(latlon[0]).to.be.closeTo(0, 0.01);
      expect(latlon[1]).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var latlon = crs.pointToLatLon([-500, -500]);

      expect(latlon[0]).to.be.closeTo(-500, 0.01);
      expect(latlon[1]).to.be.closeTo(-500, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var latlon = crs.pointToLatLon([500, 500]);

      expect(latlon[0]).to.be.closeTo(500, 0.01);
      expect(latlon[1]).to.be.closeTo(500, 0.01);
    });
  });

  describe('#wrapLatLon', () => {
    it('no wrapping by default', () => {
      expect(crs.wrapLatLon([0, 190])[1]).to.equal(190);
      expect(crs.wrapLatLon([0, 360])[1]).to.equal(360);

      expect(crs.wrapLatLon([0, -190])[1]).to.equal(-190);
      expect(crs.wrapLatLon([0, -360])[1]).to.equal(-360);

      expect(crs.wrapLatLon([0, 0])[1]).to.equal(0);
      expect(crs.wrapLatLon([0, 180])[1]).to.equal(180);
    });

    it('wraps if defined', () => {
      crs = extend({}, CRS.Simple, {
        wrapLat: [-90, 90],
        wrapLon: [-180, 180],
      });

      expect(crs.wrapLatLon([0, 190])[1]).to.equal(-170);
      expect(crs.wrapLatLon([0, 360])[1]).to.equal(0);

      expect(crs.wrapLatLon([100, 0])[0]).to.equal(-80);
      expect(crs.wrapLatLon([180, 0])[0]).to.equal(0);
    });
  });

  describe('#distance', () => {
    it('returns correct distance using trigonometry', () => {
      expect(crs.distance([0, 0], [100, 0])).to.be.closeTo(100, 0.1);
      expect(crs.distance([0, 0], [0, 100])).to.be.closeTo(100, 0.1);
      expect(crs.distance([0, 0], [100, 100])).to.be.closeTo(141.4213562373095, 0.1);
    });
  });
});

// Basic tests for projection-specific stuff as the rest is likely ok given
// correct projected / unprojected values
describe('CRS.Proj4', () => {
  // British National Grid
  var crs = CRS.Proj4('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs', [[-84667.14, 11795.97], [608366.68, 1230247.30]]);

  describe('#code', () => {
    it('returns the correct code', () => {
      expect(crs.code).to.equal('EPSG:27700');
    });
  });

  describe('#latLonToPoint', () => {
    it('projects the center', () => {
      var point = crs.latLonToPoint([55.46347028885475, -4.186594751907175]);

      expect(point[0]).to.be.closeTo(0, 0.01);
      expect(point[1]).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([60.6596573635804, -10.8865578798635]);

      // Only test y-axis as we know this is the largest size for 27700
      expect(point[1]).to.be.closeTo(-scaleFactor, 0.01);
    });

    it('projects the South-East corner', () => {
      var scaleFactor = crs.scaleFactor;
      var point = crs.latLonToPoint([49.9699671340061, 0.904406143400599]);

      // Only test y-axis as we know this is the largest size for 27700
      expect(point[1]).to.be.closeTo(scaleFactor, 0.01);
    });
  });

  describe('#pointToLatLon', () => {
    it('unprojects the center', () => {
      var latlon = crs.pointToLatLon([0, 0]);

      expect(latlon[0]).to.be.closeTo(55.46347028885475, 0.1);
      expect(latlon[1]).to.be.closeTo(-4.186594751907175, 0.1);
    });

    it('unprojects the North edge', () => {
      var scaleFactor = crs.scaleFactor;

      // Only test y-axis as we know this is the largest size for 27700
      //
      // Increased delta due to inaccuracy so far from 27700 origin
      var latlon = crs.pointToLatLon([0, -scaleFactor]);
      expect(latlon[0]).to.be.closeTo(60.6596573635804, 1);
    });

    it('unprojects the South edge', () => {
      var scaleFactor = crs.scaleFactor;

      // Only test y-axis as we know this is the largest size for 27700
      //
      // Increased delta due to inaccuracy so far from 27700 origin
      var latlon = crs.pointToLatLon([0, scaleFactor]);
      expect(latlon[0]).to.be.closeTo(49.9699671340061, 1);
    });
  });
});
