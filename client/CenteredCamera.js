var THREE = require('three'),
    utils = require('./utils'),
    transform = require('perspective-transform');

function Camera(compositor) {
  this.compositor = compositor;
  var config = this.config = compositor.config;

  var camera = this.camera = new THREE.PerspectiveCamera(60, config.width / config.height, 0.1, 1000);
  var renderer = this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(config.width, config.height);
  this.renderer.domElement.className = 'camera centered';
  var wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.appendChild(this.renderer.domElement);
  this.canvas = this.renderer.domElement;
  this.renderer.domElement = wrap;

  this.helper = new THREE.CameraHelper(this.camera);

  compositor.scene.add(this.helper);

  camera.position.set(0, 0, 0);
}

Camera.prototype.render = function(step) {
  var compositor = this.compositor,
      config = this.config;

  this.camera.position.x = step;
  this.camera.lookAt(compositor.film.position);
  this.renderer.render(compositor.scene, this.camera);


  if(config.camera.showCenterData) {
    var bbox = utils.getProjectedBBox(compositor.film.mesh, this.camera, true, config.width, config.height);
    var n = [0, 0, config.width, 0, config.width, config.height, 0, config.height];
    var tx = transform(utils.getCorners(bbox), n);

    this.canvas.style.transformOrigin = '0 0 0';
    this.canvas.style.transform = utils.toCSS3D(tx, config.scale);
    this.renderer.domElement.style.width = config.width * config.scale +'px';
    this.renderer.domElement.style.height = config.height * config.scale +'px';
  }
}


module.exports = Camera;
