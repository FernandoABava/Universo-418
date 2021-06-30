var ca;
var cf;
var bg;

var lBg;

var v = 0;
var s = 0;

var posA = {}
var posB = {}

var pestado;

function iniciarSketch(){
  ca = color('#984063');
  cf = color('#41436A');
  bg = color('#2a3950');
  lBg = bg;

  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  cnv.position(0,0);
  var p = select('#cnv');
  cnv.parent(p);

  stroke(cf);
  strokeWeight(1);
  noFill();
  randomizePos();
}

function randomizePos(){
  if(estado == 'entorno' || estado == 'turno'){
    posA = {
      x: random(width*.1, width*.9),
      y: random(height*.65, height*.85),
      t: random(height*.2, height * .4)
    }
    posB = {
      x: random(width*.1, width*.9),
      y: random(height*.65, height*.85),
      t: random(height*.025, height * .15)
    }
  }else if (estado == 'viaje') {
    posA = {
      x: random(width*.2, width*.5),
      y: random(height*.75, height*.93),
      t: random(height*.1, height * .2)
    }
    posB = {
      x: random(width*.058, width*.25),
      y: random(height*.093, height*.25),
      t: random(height*.02, height*.1)
    }
  }else if(estado == 'final' || estado == 'intro'){
    posA = {
      x: random(width*.2, width*.8),
      y: random(height*.2, height*.8),
      t: random(height*.05, height * .3)
    }
  }
}

function draw() {
  background(lBg, 10);
  if(estado == 'entorno'){
    fondo3();
    drawProgreso();
  }else if(estado == 'turno'){
    fondo3();
  }else if (estado == 'viaje') {
    fondo1();
    drawProgreso();
  }else if(estado == 'intro'){
    fondo2();
  }else if(estado == 'final'){
    fondo4();
  }else if (estado == 'prueba') {
    fondo4();
  }
  // fondo4();
  if(estado != pestado){
    randomizePos()
  }
  pestado = estado;
  lBg = lerpColor(lBg, bg, .1);
}

function fondo1() {
  push();
  var sy;
  var sx;
  v += .25;
  s = sin(v * .05)*.5 + .5;
  sy = s * height * .5;
  sx = s * width;

  // background(bg, 10);

  for (var i = 0; i < 25; i++) {
    stroke(cf);
    if(i > 5 && i< 6+ 12-vida) stroke(ca);

    // var x = width/25 * i * .5;
    // var x = width * .15;
    var n = noise((i+ v + mouseX * .01) * .017);
    bezier(posA.x, posA.y, -n * width *.75, (height-sy) * (n), n * width*.85, sy, posB.x, posB.y);
  }
  // fill(bg);
  fill(cf);
  ellipse(posA.x, posA.y, posA.t);
  stroke(ca);
  fill(ca);
  ellipse(posB.x, posB.y, posB.t);
  pop();
}

function fondo2() {
  push()
  var sy;
  var sx;
  v += .25;
  s = sin(v * .05)*.5 + .5;
  sy = s * height;
  sx = s * posA.x;

  // background(bg, 10);

  for (var i = 0; i < 25; i++) {
    stroke(cf);
    if(i == 17) stroke(ca);

    var y = height/25 * i * .5;
    y += height*.5
    var n = noise((i- v - mouseY*.01) * .05);
    bezier(0, y, width*.75-sx, n * height + height*.5, sx, -n * height *.5+height *.5, width, y);
  }

  stroke(ca);
  // fill(ca)
  ellipse(posA.x, posA.y, posA.t);
  pop()
}

function fondo3() {
  push()
  v += .25;
  for (var i = 0; i < 15; i ++){
    stroke(cf);
    if(i > 2 && i< 3+ 12-vida)stroke(ca);
    var n = noise((i + v) * 0.057) * height*.2;
    line(0, height-n, width, height-n);
  }

  fill(cf);
  ellipse(posA.x, posA.y, posA.t)
  stroke(ca);
  fill(ca)
  ellipse(posB.x, posB.y, posB.t)
  pop()
}

function fondo4() {
  push()
  var sy;
  var sx;
  v += .25;
  s = sin(v * .005)*.5 + .5;
  sy = s * height;
  sx = s * width;

  background(bg, 10);

  for (var i = 0; i < 17; i++) {
    stroke(cf);
    if(i == 9) stroke(ca);

    var n = noise((i- v - mouseY*.01) * .05);
    posA.x = width*.75 + cos(0) * height * n;
    posA.y = sy + sin(0) * height * n;
    posB.x = width*.25 + cos(radians(270)) * height * n;
    posB.y = sy + sin(radians(270)) * height * n;
    bezier(width*.5, height*.5, posA.x, posA.y, posB.x, posB.y, 0, height);
  }

  // stroke(ca);
  // ellipse(posB.x, posB.y, height*.25);
  pop()
}

function drawProgreso() {
  push();
  strokeWeight(2)
  stroke(color($(':root').css('--m-figura')));
  noFill();
  line(width*.1, height*.8, width*.9, height*.8);
  ellipse(width*.9, height*.8, 20);

  stroke(ca);
  let prog = 1-(maso.length/24);
  let x = width*.1 + width*.8*prog;
  line(width*.1, height*.8, x, height*.8);

  fill(ca)
  ellipse(x, height*.8, 20);

  pop();
}
