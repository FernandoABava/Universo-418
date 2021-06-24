function introducir() {
  $('.carta').hide();
  $('.hp').hide();
  $('.mundo').html(intro);
  $('.entorno').animate({marginTop: '10rem', marginBottom: '10rem'}, 'slow');

  playMainAudio(audioIntro);
  loopAtmos(atmosOtros[0]);
}

function salirIntro(callback, nxt) {
  if(audio) mainAudio.stop();
  $('.hp').fadeIn('slow', function() {
  });

  $('.entorno').hide('400', function() {
    callback();
    $('.entorno').show('400', function() {
    });
  });
  estado = nxt;
}
