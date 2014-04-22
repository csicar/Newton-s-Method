function Newton(F, f, x0){
  var x = [x0];
  return {
    x: x,
    next: function(){
      var x_n = x[x.length-1];
      var x_m = (x_n- (F(x_n, 0)/f(x_n, 0)))
      x.push(x_m)
      return x_m;
    },
    Tangent: function(u){
      return function(x){
        return (f(u, 0)*(x-u)+F(u, 0));
      }
    },
  }
}
function fade(i){
  return 1-0.2*i
}


function clone(val){
return val
}
window.math = mathjs();

var NV = function(){
  var i = 0;
  mathbox.curve({
    id: 'F',
    domain: [-10, 10],
    color: 0xcc0000,
  })
  this.Funktion = 'sin(x)';
  this.Ableitung = 'cos(x)';
  this.x0 = 1.141;
  this.run = function(){
    i = 0;
    mathbox.remove('#line');
    mathbox.remove('#dot');
    mathbox.remove('#tangent');
    d3.select('#data').selectAll('p').remove();
    var self = this;

    this.F =  math.eval("F(x, i)="+self.Funktion);
    this.f = math.eval('f(x, i)='+self.Ableitung);
    mathbox.animate('#F', {
      domain: [-10, 10],
      expression: this.F,
      color: 0xCC0000,
    }, {
      duration: 500,
    })
    this.v = Newton(this.F, this.f, this.x0);


  };
  this.next = function(){
    var v = this.v
    var x_0 = clone(this.x0);

    var F = this.F
    var f = this.f
    var equals = (v.x[v.x.length-1] == v.x[v.x.length-2])
    if(i == 0){
      x = x_0;
    }else{
      var x = v.next();
    }
    console.log(i, x, equals);
    //Tangente
    var rep = d3.select('#data').selectAll('p').data(this.v.x)
    rep.enter().append('p').html(function(d, i){
      return '<span class="i">'+i+'</span>'+'<span class="d">'+d+'</span>'
    });
    rep.exit().remove();

    mathbox.curve({
      domain: [x-5, x+5],
      id: 'tangent',
      expression: v.Tangent(x),
      color: 0x669900,
      opacity: fade(i),
    })
    //Punkt
    .curve({
      n: 1,
      id: 'dot',
      data: [[x, F(x, 0)]],
      pointSize: 7,
      points: true,
      color: 0x33B5E5,
      line: false,
      opacity: fade(i),
    })
    //Linie
    .vector({
      n: 1,
      id: 'line',
      color: 0x33B5E5,
      data: [[x, 0], [x, F(x, 0)]],
      opacity: fade(i),
    })
    i += 1;
  };
};
