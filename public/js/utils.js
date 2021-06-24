Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

function randomXcuatro(r, m){
  var c = Math.floor(Math.random() * m.length)

  var b = false;
  r.forEach((carta, i) => {
    if(carta == c){
      b = true;
    }
  });

  if(r.length >= 3){
    var iguales = 0;
    r.forEach((carta, i) => {
      if(m[carta].energia < 0)
        iguales --;
      else if(m[carta].energia > 0)
        iguales ++;
    });

    if(m[c].energia < 0)
      iguales --;
    else if(m[c].energia > 0)
      iguales ++;

    if(iguales >= 4){
      c = Math.floor(Math.random() * (m.length*.5))
    } else if(iguales <= -4){
      c = Math.floor(Math.random() * (m.length*.5) + (m.length*.5))
    }
  }

  if(b) randomXcuatro(r, m);
  else r.push(c);

  if(r.length < 4) randomXcuatro(r, m);

  return r;
}

function alertar(txt, i) {
  $('.alerta').find('span').text(txt);
  playMainAudio(aAlertas[i])
  $('.alerta').fadeIn('slow', function() {
    setTimeout(()=>{
      $('.alerta').fadeOut('slow', function() {
      });
    }, 2000)
  });
}

function urlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function imgExists(n){
  var url = 'img/carta'+n+'.png';
  return urlExists(url);
}

function atmosExists(n){
  var url = '../audio/atmos/atmos'+ n +'.mp3';
  return urlExists(url);
}
