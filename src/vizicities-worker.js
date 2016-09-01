import Geo from './geo/Geo.js';
import Layer, {layer} from './layer/Layer';
import GeoJSONWorkerLayer, {geoJSONWorkerLayer} from './layer/GeoJSONWorkerLayer';
import PolygonLayer, {polygonLayer} from './layer/geometry/PolygonLayer';

import Point, {point} from './geo/Point';
import LatLon, {latLon} from './geo/LatLon';

import Util from './util/index';

const VIZI = {
  version: '0.3',

  Geo: Geo,
  Layer: Layer,
  layer: layer,
  GeoJSONWorkerLayer: GeoJSONWorkerLayer,
  geoJSONWorkerLayer: geoJSONWorkerLayer,
  PolygonLayer: PolygonLayer,
  polygonLayer: polygonLayer,
  Point: Point,
  point: point,
  LatLon: LatLon,
  latLon: latLon,
  Util: Util
};

export default VIZI;
