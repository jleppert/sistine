function Interface(compositor, el) {
  this.compositor = compositor;
  this.el = el;

  var config = compositor.config;

  var scrubber = document.createElement('input');
  var steps = config.camera.length / config.camera.stepSize;

  scrubber.type = 'range';
  scrubber.min = 0;
  scrubber.max = steps / config.camera.stepSize;
  scrubber.step = config.camera.stepSize;
  scrubber.value = 0;
  scrubber.className = 'position';

  el.appendChild(scrubber);

  this.compositor.on('step', function() {
    scrubber.value = this.state.step.current;
  });
}

module.exports = Interface;
