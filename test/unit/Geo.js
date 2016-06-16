import extend from 'lodash.assign';
import Geo from '../../src/geo/Geo';
import {latLon as LatLon} from '../../src/geo/LatLon';
import {point as Point} from '../../src/geo/Point';

describe('Geo', () => {
  describe('#latLonToPoint', () => {
    it('projects the center', () => {
      var point = Geo.latLonToPoint(LatLon(0, 0));

      expect(point.x).to.be.closeTo(0, 0.01);
      expect(point.y).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var bounds = Geo.bounds;
      var point = Geo.latLonToPoint(LatLon(85.0511287798, -180));

      expect(point.x).to.be.closeTo(bounds[0][0], 0.01);
      expect(point.y).to.be.closeTo(bounds[0][1], 0.01);
    });

    it('projects the South-East corner', () => {
      var bounds = Geo.bounds;
      var point = Geo.latLonToPoint(LatLon(-85.0511287798, 180));

      expect(point.x).to.be.closeTo(bounds[1][0], 0.01);
      expect(point.x).to.be.closeTo(bounds[1][1], 0.01);
    });
  });

  describe('#pointToLatLon', () => {
    it('unprojects the center', () => {
      var latlon = Geo.pointToLatLon(Point(0, 0));

      expect(latlon.lat).to.be.closeTo(0, 0.01);
      expect(latlon.lon).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var bounds = Geo.bounds;
      var latlon = Geo.pointToLatLon(Point(bounds[0][0], bounds[0][1]));

      expect(latlon.lat).to.be.closeTo(85.0511287798, 0.01);
      expect(latlon.lon).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var bounds = Geo.bounds;
      var latlon = Geo.pointToLatLon(Point(bounds[1][0], bounds[1][1]));

      expect(latlon.lat).to.be.closeTo(-85.0511287798, 0.01);
      expect(latlon.lon).to.be.closeTo(180, 0.01);
    });
  });

  describe('#project', () => {
    it('projects the center', () => {
      var point = Geo.project(LatLon(0, 0));

      expect(point.x).to.be.closeTo(0, 0.01);
      expect(point.y).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var point = Geo.project(LatLon(85.0511287798, -180));

      expect(point.x).to.be.closeTo(-20037508.34279, 0.01);
      expect(point.y).to.be.closeTo(20037508.34278, 0.01);
    });

    it('projects the South-East corner', () => {
      var point = Geo.project(LatLon(-85.0511287798, 180));

      expect(point.x).to.be.closeTo(20037508.34278, 0.01);
      expect(point.y).to.be.closeTo(-20037508.34278, 0.01);
    });

    it('caps the maximum latitude', () => {
      var point = Geo.project(LatLon(-90, 180));

      expect(point.x).to.be.closeTo(20037508.34278, 0.01);
      expect(point.y).to.be.closeTo(-20037508.34278, 0.01);
    });
  });

  describe('#unproject', () => {
    it('unprojects the center', () => {
      var latlon = Geo.unproject(Point(0, 0));

      expect(latlon.lat).to.be.closeTo(0, 0.01);
      expect(latlon.lon).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var latlon = Geo.unproject(Point(-20037508.34278, 20037508.34278));

      expect(latlon.lat).to.be.closeTo(85.0511287798, 0.01);
      expect(latlon.lon).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var latlon = Geo.unproject(Point(20037508.34278, -20037508.34278));

      expect(latlon.lat).to.be.closeTo(-85.0511287798, 0.01);
      expect(latlon.lon).to.be.closeTo(180, 0.01);
    });
  });

  describe('#scale', () => {
    it('defaults to 1', () => {
      var scale = Geo.scale();
      expect(scale).to.equal(1);
    });

    it('uses the zoom level if provided', () => {
      var scale = Geo.scale(1);
      expect(scale).to.equal(512);
    });
  });

  describe('#zoom', () => {
    it('returns zoom level for given scale', () => {
      var scale = 512;
      var zoom = Geo.zoom(scale);

      expect(zoom).to.equal(1);
    });
  });

  // describe('#wrapLatLon', () => {
  //   it('wraps longitude between -180 and 180 by default', () => {
  //     expect(Geo.wrapLatLon(LatLon(0, 190)).lon).to.equal(-170);
  //     expect(Geo.wrapLatLon(LatLon(0, 360)).lon).to.equal(0);
  //
  //     expect(Geo.wrapLatLon(LatLon(0, -190)).lon).to.equal(170);
  //     expect(Geo.wrapLatLon(LatLon(0, -360)).lon).to.equal(0);
  //
  //     expect(Geo.wrapLatLon(LatLon(0, 0)).lon).to.equal(0);
  //     expect(Geo.wrapLatLon(LatLon(0, 180)).lon).to.equal(180);
  //   });
  //
  //   it('keeps altitude value', () => {
  //     expect(Geo.wrapLatLon(LatLon(0, 190, 100)).lon).to.equal(-170);
  //     expect(Geo.wrapLatLon(LatLon(0, 190, 100)).alt).to.equal(100);
  //   });
  // });

  describe('#distance', () => {
    it('returns correct distance using cosine law approximation', () => {
      expect(Geo.distance(LatLon(0, 0), LatLon(0.001, 0))).to.be.closeTo(111.31949492321543, 0.1);
    });

    it('returns correct distance using Haversine', () => {
      expect(Geo.distance(LatLon(0, 0), LatLon(0.001, 0), true)).to.be.closeTo(111.3194907932736, 0.1);
    });
  });

  describe('#pointScale', () => {
    var pointScale;

    it('returns approximate point scale factor', () => {
      pointScale = Geo.pointScale(LatLon(0, 0));

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1, 0.1);

      pointScale = Geo.pointScale(LatLon(60, 0));

      expect(pointScale[0]).to.be.closeTo(1.9999999999999996, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.9999999999999996, 0.1);
    });

    it('returns accurate point scale factor', () => {
      pointScale = Geo.pointScale(LatLon(0, 0), true);

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.0067394967683778, 0.1);

      pointScale = Geo.pointScale(LatLon(60, 0), true);

      expect(pointScale[0]).to.be.closeTo(1.994972897047054, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.9983341753952164, 0.1);
    });
  });

  describe('#metresToProjected', () => {
    var pointScale;

    it('returns correct projected units', () => {
      pointScale = Geo.pointScale(LatLon(0, 0));
      expect(Geo.metresToProjected(1, pointScale)).to.be.closeTo(1, 0.1);

      pointScale = Geo.pointScale(LatLon(60, 0));
      expect(Geo.metresToProjected(1, pointScale)).to.be.closeTo(1.9999999999999996, 0.1);
    });
  });

  describe('#projectedToMetres', () => {
    var pointScale;

    it('returns correct real metres', () => {
      pointScale = Geo.pointScale(LatLon(0, 0));
      expect(Geo.projectedToMetres(1, pointScale)).to.be.closeTo(1, 0.1);

      pointScale = Geo.pointScale(LatLon(60, 0));
      expect(Geo.projectedToMetres(1.9999999999999996, pointScale)).to.be.closeTo(1, 0.1);
    });
  });

  // These two are combined as it is hard to write an invidual test that can
  // be specified without knowing or redifining Geo.scaleFactor
  describe('#metresToWorld & #worldToMetres', () => {
    var pointScale;
    var worldUnits;
    var metres;

    it('returns correct world units', () => {
      pointScale = Geo.pointScale(LatLon(0, 0));
      worldUnits = Geo.metresToWorld(1, pointScale);
      metres = Geo.worldToMetres(worldUnits, pointScale);

      expect(metres).to.be.closeTo(1, 0.1);

      pointScale = Geo.pointScale(LatLon(60, 0));
      worldUnits = Geo.metresToWorld(1, pointScale);
      metres = Geo.worldToMetres(worldUnits, pointScale);

      expect(metres).to.be.closeTo(1, 0.1);
    });
  });
});
