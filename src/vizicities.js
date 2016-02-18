import World from './World';
import Controls from './controls/index';
import EnvironmentLayer from './layer/environment/EnvironmentLayer';
import ImageTileLayer from './layer/tile/ImageTileLayer';
import Point from './geo/Point';
import LatLon from './geo/LatLon';

const VIZI = {
  version: '0.3',

  // Public API
  World: World,
  Controls: Controls,
  EnvironmentLayer: EnvironmentLayer,
  ImageTileLayer: ImageTileLayer,
  Point: Point,
  LatLon: LatLon
};

export default VIZI;
