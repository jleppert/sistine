var THREE = require('three');

function TopCamera(compositor) {
  this.compositor = compositor;
  var config = this.config = compositor.config;

  var camera = this.camera = new THREE.PerspectiveCamera(60, config.width / config.height, 0.1, 1000);
  var renderer = this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(400, 240);
  this.renderer.domElement.className = 'camera top';

  camera.lookAt(compositor.scene.position);

  camera.up.set(0, 1, 0);
  camera.position.y = config.camera.distance + 100;
  camera.position.z = -1;
  camera.position.x = -100;

  this.renderer.domElement.style.top = config.height * config.scale + 'px';

  camera.lookAt(compositor.film.position);
}

TopCamera.prototype.render = function(step) {
  this.renderer.render(this.compositor.scene, this.camera);
}

module.exports = TopCamera;
