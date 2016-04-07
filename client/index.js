var THREE = require('three'),
    CameraRail = require('./CameraRail.js'),
    CenteredCamera = require('./CenteredCamera'),
    TopCamera = require('./TopCamera'),
    Film = require('./Film.js'),
    Subject = require('./Subject.js'),
    Interface = require('./Interface.js');

function Compositor(config, container) {
  this.config = config;

  this.scene = new THREE.Scene();

  this.rail = new CameraRail(this);
  this.film = new Film(this);
  this.subject = new Subject(this);

  this.centeredCamera = new CenteredCamera(this);
  var cameras = this.cameras = [this.centeredCamera, new TopCamera(this)];

  cameras.forEach(function(camera) {
    container.appendChild(camera.renderer.domElement);
  });

  this._cb = [];
}

Compositor.prototype.start = function() {
  var config = this.config;

  var state = {
    fps: 60,
    then: Date.now(),
    step: {
      total: config.camera.length / config.camera.stepSize,
      current: 0
    },
    init: function() {
      this.interval = 1000 / this.fps;
      return this;
    }
  }.init();

  function draw() {
    state.requestId = requestAnimationFrame(draw.bind(this));
    state.now = Date.now();
    state.delta = state.now - state.then;

    if(state.delta > state.interval) {
      state.then = state.now - (state.delta % state.interval);
      if(state.step.current > config.camera.length) state.step.current = 0;
      state.step.current += config.camera.stepSize;

      this.cameras.forEach(function(camera) {
        camera.render(state.step.current);
      }.bind(this));

      if(this._cb.step.length) {
        this._cb.step.forEach(function(cb) {
          cb.call(this);
        }.bind(this));
      }
    }
  }

  this.state = state;
  draw.call(this);
}

Compositor.prototype.on = function(ev, cb) {
  this._cb[ev] = this._cb[ev] || [];
  this._cb[ev].push(cb);
}

var compositor = new Compositor({
  scale: 0.2,
  width: 360 * 5,
  height: 360 * 5,

  film: {
    width: 100,
    height: 100,
    slit: 1
  },

  camera: {
    type: 'perspective',
    showCenterData: true,
    perspectiveOptions: {
      fieldOfView: 60,
      near: 0.1,
      far: 1000
    },
    orthoOptions: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
      near: 10,
      far: 10
    },
    length: 100,
    distance: 100,
    stepSize: 1,

    strategy: 'centered'
  },
  object: {
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: 1
  }
}, document.getElementById('container'));

window.compositor = compositor;

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

var utils = require('./utils');
compositor.on('step', function() {
  var bbox = new THREE.Box3().setFromObject(this.subject.mesh);

  var camera = this.centeredCamera.camera;
  var ul = (new THREE.Vector3(bbox.min.x, bbox.max.y, bbox.min.z));
  var ur = (new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.max.z));

  //console.log(ul.distanceTo(camera.position) - ur.distanceTo(camera.position));

  var a = Math.abs(ul.distanceTo(ur));
  var b = ul.distanceTo(camera.position);
  var c = ur.distanceTo(camera.position);

  var angle1 = Math.acos( (b*b + c*c - a*a) / (2.0 * b * c));
  var angle2 = Math.acos( (c*c + a*a - b*b) / (2.0 * c * a));
  var angle3 = Math.acos( (a*a + b*b - c*c) / (2.0 * a * b));

  console.log(this.state.step.current);
  //console.log(ul.z, ur.z);
  //console.log(ul.x - ur.x);
  //console.log(a, b, c);
  console.log(utils.toDeg(angle1), utils.toDeg(angle2), utils.toDeg(angle3));
  //console.log(b - c);
});

compositor.ui = new Interface(compositor, document.getElementById('controls'));
compositor.start();
