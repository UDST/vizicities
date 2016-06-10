import Projection from '../../src/geo/projection/index';
import {latLon as LatLon} from '../../src/geo/LatLon';
import {point as Point} from '../../src/geo/Point';

describe('Projection.SphericalMercator', () => {
  var projection = Projection.SphericalMercator;

  describe('#project', () => {
    it('projects the center', () => {
      var point = projection.project(LatLon(0, 0));

      expect(point.x).to.be.closeTo(0, 0.01);
      expect(point.y).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var point = projection.project(LatLon(85.0511287798, -180));

      expect(point.x).to.be.closeTo(-20037508.34279, 0.01);
      expect(point.y).to.be.closeTo(20037508.34278, 0.01);
    });

    it('projects the South-East corner', () => {
      var point = projection.project(LatLon(-85.0511287798, 180));

      expect(point.x).to.be.closeTo(20037508.34278, 0.01);
      expect(point.y).to.be.closeTo(-20037508.34278, 0.01);
    });

    it('caps the maximum latitude', () => {
      var point = projection.project(LatLon(-90, 180));

      expect(point.x).to.be.closeTo(20037508.34278, 0.01);
      expect(point.y).to.be.closeTo(-20037508.34278, 0.01);
    });
  });

  describe('#unproject', () => {
    it('unprojects the center', () => {
      var latlon = projection.unproject(Point(0, 0));

      expect(latlon.lat).to.be.closeTo(0, 0.01);
      expect(latlon.lon).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var latlon = projection.unproject(Point(-20037508.34278, 20037508.34278));

      expect(latlon.lat).to.be.closeTo(85.0511287798, 0.01);
      expect(latlon.lon).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var latlon = projection.unproject(Point(20037508.34278, -20037508.34278));

      expect(latlon.lat).to.be.closeTo(-85.0511287798, 0.01);
      expect(latlon.lon).to.be.closeTo(180, 0.01);
    });
  });

  describe('#pointScale', () => {
    var pointScale;

    it('returns approximate point scale factor', () => {
      pointScale = projection.pointScale(LatLon(0, 0));

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1, 0.1);

      pointScale = projection.pointScale(LatLon(60, 0));

      expect(pointScale[0]).to.be.closeTo(1.9999999999999996, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.9999999999999996, 0.1);
    });

    it('returns accurate point scale factor', () => {
      pointScale = projection.pointScale(LatLon(0, 0), true);

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.0067394967683778, 0.1);

      pointScale = projection.pointScale(LatLon(60, 0), true);

      expect(pointScale[0]).to.be.closeTo(1.994972897047054, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.9983341753952164, 0.1);
    });
  });

  describe('#bounds', () => {
    it('returns correct bounds', () => {
      var dimensions = 40075016.6855785;
      var bounds = projection.bounds;

      expect(Math.abs(bounds[1][0] - bounds[0][0])).to.be.closeTo(dimensions, 0.1);
      expect(Math.abs(bounds[1][1] - bounds[0][1])).to.be.closeTo(dimensions, 0.1);
    });
  });
});

describe('Projection.Mercator', () => {
  var projection = Projection.Mercator;

  describe('#project', () => {
    it('projects the center', () => {
      var point = projection.project(LatLon(0, 0));

      expect(point.x).to.be.closeTo(0, 0.01);
      expect(point.y).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var point = projection.project(LatLon(85.0840591556, -180));

      expect(point.x).to.be.closeTo(-20037508.34279, 0.01);
      expect(point.y).to.be.closeTo(20037508.4798169, 0.01);
    });

    it('projects the South-East corner', () => {
      var point = projection.project(LatLon(-85.0840591556, 180));

      expect(point.x).to.be.closeTo(20037508.34279, 0.01);
      expect(point.y).to.be.closeTo(-20037508.4798169, 0.01);
    });
  });

  describe('#unproject', () => {
    it('unprojects the center', () => {
      var latlon = projection.unproject(Point(0, 0));

      expect(latlon.lat).to.be.closeTo(0, 0.01);
      expect(latlon.lon).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var latlon = projection.unproject(Point(-20037508.34279, 20037508.4798169));

      expect(latlon.lat).to.be.closeTo(85.0840591556, 0.01);
      expect(latlon.lon).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var latlon = projection.unproject(Point(20037508.34279, -20037508.4798169));

      expect(latlon.lat).to.be.closeTo(-85.0840591556, 0.01);
      expect(latlon.lon).to.be.closeTo(180, 0.01);
    });
  });

  describe('#pointScale', () => {
    var pointScale;

    it('returns point scale factor', () => {
      pointScale = projection.pointScale(LatLon(0, 0));

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1, 0.1);

      pointScale = projection.pointScale(LatLon(60, 0));

      expect(pointScale[0]).to.be.closeTo(1.9999999999999996, 0.1);
      expect(pointScale[1]).to.be.closeTo(1.9999999999999996, 0.1);
    });
  });

  describe('#bounds', () => {
    it('returns correct bounds', () => {
      var dimensions = [40075016.68558, 34261226.9711];
      var bounds = projection.bounds;

      expect(Math.abs(bounds[1][0] - bounds[0][0])).to.be.closeTo(dimensions[0], 0.1);
      expect(Math.abs(bounds[1][1] - bounds[0][1])).to.be.closeTo(dimensions[1], 0.1);
    });
  });
});

describe('Projection.LatLon', () => {
  var projection = Projection.LatLon;

  describe('#project', () => {
    it('projects the center', () => {
      var point = projection.project(LatLon(0, 0));

      expect(point.x).to.be.closeTo(0, 0.01);
      expect(point.y).to.be.closeTo(0, 0.01);
    });

    it('projects the North-West corner', () => {
      var point = projection.project(LatLon(90, -180));

      expect(point.x).to.be.closeTo(-180, 0.01);
      expect(point.y).to.be.closeTo(90, 0.01);
    });

    it('projects the South-East corner', () => {
      var point = projection.project(LatLon(-90, 180));

      expect(point.x).to.be.closeTo(180, 0.01);
      expect(point.y).to.be.closeTo(-90, 0.01);
    });
  });

  describe('#unproject', () => {
    it('unprojects the center', () => {
      var latlon = projection.unproject(Point(0, 0));

      expect(latlon.lat).to.be.closeTo(0, 0.01);
      expect(latlon.lon).to.be.closeTo(0, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var latlon = projection.unproject(Point(-180, 90));

      expect(latlon.lat).to.be.closeTo(90, 0.01);
      expect(latlon.lon).to.be.closeTo(-180, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var latlon = projection.unproject(Point(180, -90));

      expect(latlon.lat).to.be.closeTo(-90, 0.01);
      expect(latlon.lon).to.be.closeTo(180, 0.01);
    });
  });

  describe('#pointScale', () => {
    var pointScale;

    it('returns point scale factor', () => {
      pointScale = projection.pointScale(LatLon(0, 0));

      expect(pointScale[0]).to.be.closeTo(0.000009043695025814084, 0.1);
      expect(pointScale[1]).to.be.closeTo(0.000009043695025814084, 0.1);

      pointScale = projection.pointScale(LatLon(60, 0));

      expect(pointScale[0]).to.be.closeTo(0.000009043695025814084, 0.1);
      expect(pointScale[1]).to.be.closeTo(0.000009043695025814084, 0.1);
    });
  });

  describe('#bounds', () => {
    it('returns correct bounds', () => {
      var dimensions = [360, 180];
      var bounds = projection.bounds;

      expect(Math.abs(bounds[1][0] - bounds[0][0])).to.be.closeTo(dimensions[0], 0.1);
      expect(Math.abs(bounds[1][1] - bounds[0][1])).to.be.closeTo(dimensions[1], 0.1);
    });
  });
});

describe('Projection.Proj4', () => {
  // British National Grid
  var projection = Projection.Proj4('+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs', [[-84667.14, 11795.97], [608366.68, 1230247.30]]);

  describe('#project', () => {
    it('projects the center', () => {
      var point = projection.project(LatLon(55.46347028885475, -4.186594751907175));

      expect(point.x).to.be.closeTo(261849.77, 0.1);
      expect(point.y).to.be.closeTo(621021.635, 0.1);
    });

    it('projects the North-West corner', () => {
      var point = projection.project(LatLon(60.6596573635804, -10.8865578798635));

      expect(point.x).to.be.closeTo(-84667.14, 0.1);
      expect(point.y).to.be.closeTo(1230247.30, 0.1);
    });

    it('projects the South-East corner', () => {
      var point = projection.project(LatLon(49.9699671340061, 0.904406143400599));

      expect(point.x).to.be.closeTo(608366.68, 0.1);
      expect(point.y).to.be.closeTo(11795.97, 0.1);
    });
  });

  describe('#unproject', () => {
    it('unprojects the center', () => {
      var latlon = projection.unproject(Point(261849.77, 621021.635));

      expect(latlon.lat).to.be.closeTo(55.46347028885475, 0.01);
      expect(latlon.lon).to.be.closeTo(-4.186594751907175, 0.01);
    });

    it('unprojects the North-West corner', () => {
      var latlon = projection.unproject(Point(-84667.14, 1230247.30));

      expect(latlon.lat).to.be.closeTo(60.6596573635804, 0.01);
      expect(latlon.lon).to.be.closeTo(-10.8865578798635, 0.01);
    });

    it('unprojects the South-East corner', () => {
      var latlon = projection.unproject(Point(608366.68, 11795.97));

      expect(latlon.lat).to.be.closeTo(49.9699671340061, 0.01);
      expect(latlon.lon).to.be.closeTo(0.904406143400599, 0.01);
    });
  });

  describe('#pointScale', () => {
    var pointScale;

    it('returns point scale factor', () => {
      pointScale = projection.pointScale(LatLon(0, 0));

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1, 0.1);

      pointScale = projection.pointScale(LatLon(60, 0));

      expect(pointScale[0]).to.be.closeTo(1, 0.1);
      expect(pointScale[1]).to.be.closeTo(1, 0.1);
    });
  });

  describe('#bounds', () => {
    it('returns correct bounds', () => {
      var dimensions = [693033.82, 1218451.33];
      var bounds = projection.bounds;

      expect(Math.abs(bounds[1][0] - bounds[0][0])).to.be.closeTo(dimensions[0], 0.1);
      expect(Math.abs(bounds[1][1] - bounds[0][1])).to.be.closeTo(dimensions[1], 0.1);
    });
  });
});
