import World, {world} from './World';
import Controls from './controls/index';

import Geo from './geo/Geo.js';

import Layer, {layer} from './layer/Layer';
import EnvironmentLayer, {environmentLayer} from './layer/environment/EnvironmentLayer';
import ImageTileLayer, {imageTileLayer} from './layer/tile/ImageTileLayer';
import GeoJSONTileLayer, {geoJSONTileLayer} from './layer/tile/GeoJSONTileLayer';
import TopoJSONTileLayer, {topoJSONTileLayer} from './layer/tile/TopoJSONTileLayer';
import GeoJSONLayer, {geoJSONLayer} from './layer/GeoJSONLayer';
import TopoJSONLayer, {topoJSONLayer} from './layer/TopoJSONLayer';
import PolygonLayer, {polygonLayer} from './layer/geometry/PolygonLayer';
import PolylineLayer, {polylineLayer} from './layer/geometry/PolylineLayer';
import PointLayer, {pointLayer} from './layer/geometry/PointLayer';

import Point, {point} from './geo/Point';
import LatLon, {latLon} from './geo/LatLon';

import PickingMaterial from './engine/PickingMaterial';

import Util from './util/index';

const VIZI = {
  version: '0.3',

  // Public API
  World: World,
  world: world,
  Controls: Controls,
  Geo: Geo,
  Layer: Layer,
  layer: layer,
  EnvironmentLayer: EnvironmentLayer,
  environmentLayer: environmentLayer,
  ImageTileLayer: ImageTileLayer,
  imageTileLayer: imageTileLayer,
  GeoJSONTileLayer: GeoJSONTileLayer,
  geoJSONTileLayer: geoJSONTileLayer,
  TopoJSONTileLayer: TopoJSONTileLayer,
  topoJSONTileLayer: topoJSONTileLayer,
  GeoJSONLayer: GeoJSONLayer,
  geoJSONLayer: geoJSONLayer,
  TopoJSONLayer: TopoJSONLayer,
  topoJSONLayer: topoJSONLayer,
  PolygonLayer: PolygonLayer,
  polygonLayer: polygonLayer,
  PolylineLayer: PolylineLayer,
  polylineLayer: polylineLayer,
  PointLayer: PointLayer,
  pointLayer: pointLayer,
  Point: Point,
  point: point,
  LatLon: LatLon,
  latLon: latLon,
  PickingMaterial: PickingMaterial,
  Util: Util
};

export default VIZI;
