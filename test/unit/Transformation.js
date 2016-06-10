import Transformation from '../../src/util/Transformation';
import {point as Point} from '../../src/geo/Point';

describe('Transformation', () => {
  var transformation;
  var point;
  var scale;

  // Probably superflous to use spies here but they serve as an example of how
  // to use them in this way at least
  beforeEach(() => {
    transformation = new Transformation(1, 0.5, 1, 0.5);
    spy(transformation, 'transform');
    spy(transformation, 'untransform');

    point = Point(5, 5);
    scale = 2;
  });

  describe('#transform', () => {
    it('can transform', () => {
      var point2 = transformation.transform(point, scale);
      expect(transformation.transform).to.have.returned(Point(11, 11));
    });

    it('uses a scale of 1 by default', () => {
      transformation.transform(point);
      expect(transformation.transform).to.have.returned(Point(5.5, 5.5));
    });
  });

  describe('#untransform', () => {
    it('can untransform', () => {
      var point2 = transformation.transform(point, scale);
      var point3 = transformation.untransform(point2, scale);

      expect(transformation.untransform).to.have.returned(point);
    });

    it('uses a scale of 1 by default', () => {
      var point2 = transformation.transform(point);
      var point3 = transformation.untransform(point2);

      expect(transformation.untransform).to.have.returned(point);
    });
  });
});
