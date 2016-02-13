import EPSG3857 from './CRS.EPSG3857';
import {EPSG900913} from './CRS.EPSG3857';
import EPSG3395 from './CRS.EPSG3395';
import EPSG4326 from './CRS.EPSG4326';
import Simple from './CRS.Simple';
import Proj4 from './CRS.Proj4';

const CRS = {};

CRS.EPSG3857 = EPSG3857;
CRS.EPSG900913 = EPSG900913;
CRS.EPSG3395 = EPSG3395;
CRS.EPSG4326 = EPSG4326;
CRS.Simple = Simple;
CRS.Proj4 = Proj4;

export default CRS;
