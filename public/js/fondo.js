var ca;
var cf;
var bg;

var t = 9;
var v = 0;
var m = 60;

var i = 0;

let texto = 'Hola Suyi, cómo andas? Yo soy Fer y este es un texto largo. Muy muy muy (casi que no tanto igual) largo.'

function setup() {
  ca = color('#F64668');
  cf = color('#4c6e81');
  bg = color('#2a3950');

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  cnv.position(0,0);
  // var p = select('#cnv');
  // cnv.parent(p);

  stroke(cf);
  strokeWeight(1);
  fill(bg);
  rectMode(CENTER);
}

function draw() {
  // background(bg);
  v += .1;
  // for(var i = 0; i< m; i++){
    for(var j = 0; j< m; j++){
      var x = i * (height)/m + height*.2;
      var y = j * (height)/m;
      var ii = i/m;
      var jj = j/m;

      push()
      translate(x, y);

      push()
      stroke(bg)
      rect(0,0,t,t);
      pop()



      if(dist(x, y, mouseX, mouseY) < 100){
        stroke(ca)
      }
      if(jj < noise(ii*3, jj*3 -v*.1)){
        cross(x, y)
      }else if (jj >= noise(ii*4, jj*4 - v*.1)) {
        dat()
        // text('w', 0, 0)
      }else {
        dot()
      }

      if(i >19 && j > 19 && i < 40 && j<40){
        push()
        stroke(bg)
        rect(0,0, t, t)
        fill(ca)
        var ch = texto.charAt((i-20)+((j-25) * 20))
        text(ch, 0, 0)
        pop()
      }

      pop()
    }
  // }
  i++;
  if(i>m){
    i = 0;
    // background(bg);
  }
}

function cross(){
  var tt = t*.5;
  line(0, -tt, 0, tt);
  line(-tt, 0, tt, 0);
}

function ast() {
  var tt = t*.5;
  line(0, -tt, 0, tt);
  line(-tt, 0, tt, 0);
  line(tt, tt, -tt, -tt);
  line(-tt, tt, tt, -tt);
}

function dot() {
  ellipse(0,0,t);
}

function dat(){
  rect(0,0,t, t);
}

function diag(a){
  var tt = t*.5;
  push()
  rotate(a);
  line(-tt, 0, tt, 0);
  pop()
}

function mdiag(x, y){
  var a = atan2(y-mouseY,x-mouseX)
  diag(a);
}
