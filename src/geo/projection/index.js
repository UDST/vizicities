import LatLon from './Projection.LatLon';
import SphericalMercator from './Projection.SphericalMercator';
import Mercator from './Projection.Mercator';
import Proj4 from './Projection.Proj4';

const Projection = {};

Projection.LatLon = LatLon;
Projection.SphericalMercator = SphericalMercator;
Projection.Mercator = Mercator;
Projection.Proj4 = Proj4;

export default Projection;
