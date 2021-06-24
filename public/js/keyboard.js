function keyReleased(){
  // $('button:enabled').last().focus();
  if(key == 'A' || key == 'a'){
    if($('.carta[data-index="0"]').find('.accion').is(':enabled')){
      $('.carta[data-index="0"]').find('.accion').focus();
      if(estado == 'turno'){
        reproduciendoCartas = false;
        espacioCarta(0, cartasEnMesa[0].sonido);
      }
    }
  }else if (key == 'S' || key == 's') {
    if($('.carta[data-index="1"]').find('.accion').is(':enabled')){
      $('.carta[data-index="1"]').find('.accion').focus();
      if(estado == 'turno'){
        reproduciendoCartas = false;
        espacioCarta(1, cartasEnMesa[1].sonido);
      }
    }
  }else if (key == 'D' || key == 'd') {
    if($('.carta[data-index="2"]').find('.accion').is(':enabled')){
      $('.carta[data-index="2"]').find('.accion').focus();
      if(estado == 'turno'){
        reproduciendoCartas = false;
        espacioCarta(2, cartasEnMesa[2].sonido);
      }
    }
  }else if (key == 'F' || key == 'f') {
    if($('.carta[data-index="3"]').find('.accion').is(':enabled')){
      $('.carta[data-index="3"]').find('.accion').focus();
      if(estado == 'turno'){
        reproduciendoCartas = false;
        espacioCarta(3, cartasEnMesa[3].sonido);
      }
    }
  }else if (key == 'w' || key == 'W') {
    if(!$('.pasar').is(':focus'))
      $('.pasar').first().click();
    $('.pasar').blur();
  }else if (key == 'p' || key == 'P') {
    pausa = !pausa;
    if(estado == 'turno' || estado == 'entorno')
    playPausa(atmosAudio);
    if(interrupcion){
      if(interrupcion.isPlaying()){
        playPausa(interrupcion)
      }else {
        playPausa(mainAudio);
      }
    }else {
      playPausa(mainAudio);
    }
  }else if (key == 'm' || key == 'M') {
    audio = !audio;
    if(!audio){
      mainAudio.stop();
      atmosAudio.stop();
    }else{
      playMainAudio(mainAudio);
      playAtmosAudio(atmosAudio);
    }
  }else if (key == 'i' || key == 'I') {
    interrumpir(aInstrucciones);
  }else if (key == 'e' || key == 'E') {
    reproduciendoCartas = false;
    playMainAudio(aEnergia[vida]);
  }
}
