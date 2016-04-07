var THREE = require('three');

function CameraRail(compositor) {
  var config = compositor.config;

  this.material = new THREE.LineBasicMaterial({
  	color: 0x0000ff
  });

  this.geometry = new THREE.Geometry();
  this.geometry.vertices.push(
  	new THREE.Vector3(0, 0, 0),
  	new THREE.Vector3(config.camera.length, 0, 0)
  );

  var line = this.line = new THREE.Line(this.geometry, this.material);

  compositor.scene.add(line);
}

module.exports = CameraRail;
