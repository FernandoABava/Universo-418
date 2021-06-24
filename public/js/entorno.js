let mundoActual;

function entrarMundo(){
  mundoActual = mundos.sample();
  var i = mundos.indexOf(mundoActual);
  mundos.splice(i, 1);

  $('.mundo').html(mundoActual)

  var j = entornos.indexOf(mundoActual);
  playMainAudio(audioMundos[j]);
  //COLOR
  changePalette(j);

  if(audioAtmos[j]){
    loopAtmos(audioAtmos[j]);
  }else {
    atmosAudio.stop();
  }
}

function salirMundo(){
  estado = 'turno';
  if(audio)mainAudio.stop();
  // $('.entorno').animate({marginTop: '1rem', marginBottom: '1rem'}, 'slow');
  $('.entorno').hide('slow', function() {});
  nuevaMano();
  $('.carta').fadeIn('slow', function() {
  });
}
