var THREE = require('three');

function Film(compositor) {
  var config = compositor.config;
  
  this.material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color : 0xffffff
  });

  var mesh = this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(config.film.width, config.film.height, 10, 10), this.material);
  mesh.doubleSided = true;
  mesh.position.set(config.camera.length / 2, 0, 0 - config.camera.distance);

  this.position = mesh.position;
  compositor.scene.add(mesh);
}

module.exports = Film;
