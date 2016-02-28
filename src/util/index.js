// TODO: A lot of these utils don't need to be in separate, tiny files

import Transformation from './Transformation';
import wrapNum from './wrapNum';
import extrudePolygon from './extrudePolygon';
import GeoJSON from './GeoJSON';
import Buffer from './Buffer';

const Util = {};

Util.Transformation = Transformation;
Util.wrapNum = wrapNum;
Util.extrudePolygon = extrudePolygon;
Util.GeoJSON = GeoJSON;
Util.Buffer = Buffer;

export default Util;
