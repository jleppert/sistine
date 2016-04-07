var THREE = require('three');
var snowden = require('snowden');
var createComplex = require('three-simplicial-complex')(THREE);

function Subject(compositor) {
  /*this.material = new THREE.MeshNormalMaterial({ wireframe: true, wireframeLinewidth: 1});
  //this.geometry = new THREE.CubeGeometry( 20, 20, 20 );
  this.geometry = new THREE.TorusKnotGeometry(25, 5, 200, 16);
  var mesh = this.mesh = new THREE.Mesh(this.geometry, this.material);

  mesh.position.set(config.camera.length / 2, 0, 0 - config.camera.distance);*/
  var config = compositor.config;

  var snowden = require('snowden');
  var createComplex = require('three-simplicial-complex')(THREE);
  var geo = createComplex(snowden);
  geo.computeFaceNormals();

  var mat = new THREE.MeshNormalMaterial({ wireframe: false, wireframeLinewidth: 1});
  var meesh = new THREE.Mesh(geo, mat);
  meesh.position.set(config.camera.length / 2, 0, 0 - config.camera.distance);

  meesh.scale.set( 10, 10, 10 );

  this.mesh = meesh;

  var imageCanvas = document.createElement( "canvas" ),
					context = imageCanvas.getContext( "2d" );
				imageCanvas.width = imageCanvas.height = 128;
				context.fillStyle = "#444";
				context.fillRect( 0, 0, 128, 128 );
				context.fillStyle = "#fff";
				context.fillRect( 0, 0, 64, 64);
				context.fillRect( 64, 64, 64, 64 );
				var textureCanvas = new THREE.CanvasTexture( imageCanvas );
				textureCanvas.repeat.set( 1000, 1000 );
				textureCanvas.wrapS = THREE.RepeatWrapping;
				textureCanvas.wrapT = THREE.RepeatWrapping;
        textureCanvas.magFilter = THREE.NearestFilter;
        textureCanvas.minFilter = THREE.NearestFilter;
				var textureCanvas2 = textureCanvas.clone();
				textureCanvas2.magFilter = THREE.NearestFilter;
				textureCanvas2.minFilter = THREE.NearestFilter;
				var	materialCanvas = new THREE.MeshBasicMaterial( { map: textureCanvas } );
				var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
				var meshCanvas = new THREE.Mesh( geometry, materialCanvas );

        meshCanvas.position.set(0, -100, 0);
        meshCanvas.scale.set( 1000, 1000, 1000 );

				meshCanvas.rotation.x = - Math.PI / 2;




        compositor.scene.add(meshCanvas);












  compositor.scene.add(meesh);
}

module.exports = Subject;
