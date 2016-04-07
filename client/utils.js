var THREE = require('three');

function getProjectedBBox(obj, camera, flipY, width, height) {
  var bbox = new THREE.Box3().setFromObject(obj);
  var corners = [
    (new THREE.Vector3(bbox.min.x, bbox.max.y, bbox.min.z)).project(camera),
    (new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.max.z)).project(camera),
    (new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.min.z)).project(camera),
    (new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z)).project(camera),
    (new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z)).project(camera),
    (new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z)).project(camera),
    (new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.max.z)).project(camera)
  ];

  // ul, ur, lr, ll, center
  return corners.map(function(corner) {
    corner.x = ((corner.x + 1) / 2) * width;
    if(flipY) {
      corner.y = ((-corner.y + 1) / 2) * height;
    } else {
      corner.y = ((corner.y + 1) / 2) * height;
    }

    return corner;
  });
}

function hPerspective(camera, object) {
  var bbox = THREE.Box3().setFromObject(obj);

  var width = Math.abs((bbox.max.x - bbox.min.x));
  var pMin = bbox.min.project(camera).distanceTo(camera.origin);
  var pMax = bbox.max.project(camera).distanceTo(camera.origin);

  return [width, pMin, pMax];
}

function toDeg(rad) {
  return rad * 180 / Math.PI;
}

function toRad(deg) {
  return deg * Math.PI / 180;
}

function getCorners(points) {
  var pts = [];
  points.forEach(function(point) {
    pts.push(point.x, point.y);
  });

  return pts.slice(0, 8);
}

function getDirection(step, x, y) {
  x = x || 0;
  y = y || 0;
   var pos = new THREE.Vector3(
    config.camera.length / 2 - config.film.width / 2 - step + x,
    y - config.film.height / 2,
    -config.camera.distance);

    return pos;
}

// origin is x, y, z
function getDirectionRaw(step, x, y) {
  x = x || 0;
  y = y || 0;
   var pos = new THREE.Vector3(
    config.camera.length / 2 - config.film.width / 2 - step + x,
    y - config.film.height / 2,
    -config.camera.distance);

    return new THREE.Vector3(step, 0, 0).add(pos).normalize();
}

function pastelColors(){
  var r = (Math.round(Math.random()* 127) + 127).toString(16);
  var g = (Math.round(Math.random()* 127) + 127).toString(16);
  var b = (Math.round(Math.random()* 127) + 127).toString(16);
  return '#' + r + g + b;
}

function toCSS3D(tx, scale) {
  var t = tx.coeffs;
    t = [t[0], t[3], 0, t[6],
       t[1], t[4], 0, t[7],
       0   , 0   , 1, 0   ,
       t[2], t[5], 0, t[8]];
  
  scale = scale || 1;
  return "scale(" + scale + ") matrix3d(" + t.join(", ") + ")";
}

module.exports = {
  getProjectedBBox: getProjectedBBox,
  toDeg: toDeg,
  toRad: toRad,
  getCorners: getCorners,
  getDirection: getDirection,
  getDirectionRaw: getDirectionRaw,
  pastelColors: pastelColors,
  toCSS3D: toCSS3D
};
