function make(){

  function mathboxSetup() {
    // Viewport camera/setup
    mathbox
      // Cartesian viewport
      .viewport({
        type: 'cartesian',
        range: [[-5, 5], [-5, 5]],
        scale: [1, 1],
      })
      .axis({
        id: 'x',
        axis: 0,
        color: 0xa0a0a0,
        ticks: 5,
        lineWidth: 2,
        size: .05,
      })
      .axis({
        id: 'y',
        axis: 1,
        color: 0xa0a0a0,
        ticks: 5,
        lineWidth: 2,
        size: .05,
        zero: false,
      })
      .camera({
        orbit: 1.4,
        phi: τ/4,
        theta: 0,
      })
      .transition(300)
  }
  // MathBox boilerplate
  var mathbox = window.mathbox = mathBox({
    cursor:         true,
    elementResize:  true,
    fullscreen:     true,
    screenshot:     true,
    stats:          false,
    scale:          1,
  }).start();
  mathboxSetup(mathbox);

  var nv = new NV();
  var gui = new dat.GUI();
  gui.add(nv, 'Funktion');
  gui.add(nv, 'Ableitung');
  gui.add(nv, 'x_0');
  gui.add(nv, 'run');
  gui.add(nv, 'next');
  gui.add(nv, 'doFade');
  nv.run();
}

DomReady.ready(function() {
  ThreeBox.preload([
    'snippets.glsl.html',
  ], make);
});
