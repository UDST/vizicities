// TODO: A lot of these utils don't need to be in separate, tiny files

import wrapNum from './wrapNum';
import extrudePolygon from './extrudePolygon';
import GeoJSON from './GeoJSON';
import Buffer from './Buffer';
import Worker from './Worker';
import Stringify from './Stringify';

const Util = {};

Util.wrapNum = wrapNum;
Util.extrudePolygon = extrudePolygon;
Util.GeoJSON = GeoJSON;
Util.Buffer = Buffer;
Util.Worker = Worker;
Util.Stringify = Stringify;

export default Util;
