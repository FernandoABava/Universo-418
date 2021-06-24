function entrarViaje() {
  var e = vida/max;
  var v = viajes.length * e;
  v = Math.floor(v);
  v = v > viajes.length-1 ? viajes.length-1 : v;
  v = v < 0 ? 0 : v;
  var esteViaje = viajes[v];

  changePalette();//COLOR

  $('.carta').fadeOut('slow', function() {});
  $('.carta').last().fadeOut('slow', function() {
    $('.entorno').hide('400', function() {
      $('.mundo').html(esteViaje);
      $('.entorno').show('400', function() {
        $('.entorno').animate({marginTop: '10rem', marginBottom: '10rem'}, 'slow');
      });
    });
  });

  viajes.splice(v, 1);

  var a = inters.indexOf(esteViaje);
  playMainAudio(audioViajes[a]);

  loopAtmos(atmosOtros[1]);
  atmosOtros[1].jump(posViAtmos, atmosOtros[1].duration() - posViAtmos)
  // setTimeout(()=>{
  // }, 2500)
  // playAtmos(aNave[0]);
}

function entrarFase(texto) {
  $('.carta').fadeOut('slow', function() {

    $('.entorno').hide('400', function() {
      $('.mundo').html(texto);
      if(vida<=0)
      loopAtmos(atmosOtros[2]);
      else
      loopAtmos(atmosOtros[0]);

      $('.entorno').show('400', function() {
        $('.entorno').animate({marginTop: '10rem', marginBottom: '10rem'}, 'slow');

      });
    });
  });
}

function salirViaje(callback, nxt) {
  estado = nxt;
  if(audio){
    if(atmosAudio)
    posViAtmos = atmosOtros[1].currentTime();
    mainAudio.stop();
  }
  $('.entorno').hide('400', function() {
    callback();
    $('.entorno').show('400', function() {
    });
  });
}
