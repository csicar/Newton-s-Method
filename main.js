function make(){

  function mathboxSetup() {
    // Viewport camera/setup
    mathbox
      // Cartesian viewport
      .viewport({
        type: 'cartesian',
        range: [[-10, 10], [-10, 10]],
        scale: [1, 1],
      })
      .axis({
        id: 'x',
        axis: 0,
        color: 0xa0a0a0,
        ticks: 5,
        lineWidth: 2,
        size: .05,
        labels: true,
      })
      .axis({
        id: 'y',
        axis: 1,
        color: 0xa0a0a0,
        ticks: 5,
        lineWidth: 2,
        size: .05,
        zero: false,
        labels: true,
      })
      .camera({
        orbit: 3,
        phi: τ/4,
        theta: 0,
        //lookAt: [0, 0],
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
  gui.add(nv, 'x_0');
  gui.add(nv, 'run');
  gui.add(nv, 'next');
  var look = gui.addFolder('Aussehen')
  look.add(nv, 'doFade');
  look.add(nv, 'autoTangent');
  look.add(nv, 'showCorrect');

  var dragCtrl = (function(){
    var x0;
    var y0;
    return {
      drag: function(){
        x0 = x0||d3.event.x;
        y0 = y0||d3.event.y;
        nv.move(
          -(d3.event.x-x0)/300,
          (d3.event.y-y0)/300
        )
      },
      dragstart: function(){
        x0 = null;
        y0 = null;
      },
    }
  }())

  d3.select('.mathbox-overlay')
  .call(
    d3.behavior.zoom().scaleExtent([0.1, 8]).on("zoom", function(){
      nv.zoom(d3.event.scale);
    })
  )
  .call(
    d3.behavior.drag().on('drag', dragCtrl.drag)
      .on('dragstart', dragCtrl.dragstart)
  )



  /*var cx = look.add(nv, 'cx', -10, 10);
  cx.onChange(nv.move);
  var cy = look.add(nv, 'cy', -10, 10);
  cy.onChange(nv.move);*/
  nv.run();
}

DomReady.ready(function() {
  ThreeBox.preload([
    'snippets.glsl.html',
  ], make);
});
