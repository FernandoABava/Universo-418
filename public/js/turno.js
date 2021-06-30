function nuevaMano(){
  $('.carta').find('.accion').prop('disabled', false)
  $('.pasar').prop('disabled', true);
  cartasEnMesa = [];

  var r = [];
  r = randomXcuatro(r, maso);

  r.forEach((item, i) => {
    cartasEnMesa.push(maso[item])
  });


  $('.carta').each((i, el)=>{
    // $(el).data('index', i);
    $(el).find('.accion').data('index', i);
    $(el).find('.puntos').text('E: ' + cartasEnMesa[i].energia)
    $(el).find('.descripcion').text(cartasEnMesa[i].descripcion)
    $(el).find('img').attr('src', cartasEnMesa[i].img);

    // if(cartasEnMesa[i].energia < 0){
    //   $(el).addClass('c-fg');
    // }else {
    //   $(el).removeClass('c-fg');
    // }
  })

  // mainAudio.onended(()=>{
  playMainAudio(aEnergia[vida]);
  // onEnd(mainAudio, sonidoCartas);
  onEnd(aEnergia[vida], ()=>{
    reproduciendoCartas = true;
    secuenciarCartas(0,4);
  });
  // sonidoCartas();
  // })
}

function acciones(){
  $('.carta').find('.accion').click((ev)=>{
    ev.preventDefault();
    reproduciendoCartas = false;

    var index = $(ev.target).data('index');
    var carta = cartasEnMesa[index];
    // console.log(index);

    vida += carta.energia;
    vida = vida > max ? max : vida;
    vida = vida < 0 ? 0 : vida;
    $('.hp').text('Energía: ' + vida)
    if(vida>=0)playMainAudio(aEnergia[vida]);

    if(vida <= 0){
      estado = 'final';
      entrarFase(finales[1]);
      conCatMain(aEnergia[0], audioFinales[1])
      // playMainAudio(audioFinales[1]);
      $('.pasar').prop('disabled', false);
      $('.pasar').text('Finalizar')
    }else {

      $('.hp').animate({
        opacity: .1
      }, 'fast', ()=>{
        $('.hp').animate({
          opacity: vida/12 *.75 + .25,
          width: vida/12 *100 +'%'
        }, 400);
      })

      $(ev.target).prop('disabled', true)
      cartasEnMesa[index].energia = 0;

      var j = maso.indexOf(carta);
      maso.splice(j, 1)
    }

    var cVivas = 0;
    var cPositivas = 0;
    cartasEnMesa.forEach((item, i) => {
      if(item.energia != 0){
        cVivas ++;
        if(item.energia > 0)
        cPositivas++;
      }
    });
    if(cVivas <= 1 || (cVivas <= 2 && cPositivas == 2 && vida >= 12))
      $('.pasar').prop('disabled', false);

    $(ev.target).blur();
  })
}

function pasar(){
  var cVivas = 0;
  var cPositivas = 0;
  cartasEnMesa.forEach((item, i) => {
    if(item.energia != 0){
      cVivas ++;
      if(item.energia > 0)
      cPositivas++;
    }
  });
  if(cVivas <= 1 || (cVivas <= 2 && cPositivas == 2 && vida >= 12)){
    if(atmosAudio) atmosAudio.stop();

    var viva = cartasEnMesa.find(carta => carta.energia != 0);
    if(viva){
      if(viva.energia > 0){
        viva.descripcion = d_cartas[29 - i_dExtras]
        if(imgExists(30-i_dExtras)){
          viva.img = 'img/carta' + (30-i_dExtras) + '.png'
        }
        viva.sonido = aCartas[29-i_dExtras]
        i_dExtras++;
      }else {
        viva.descripcion = d_cartas[j_dExtras]
        if(imgExists(j_dExtras+1)){
          viva.img = 'img/carta' + (j_dExtras+1) + '.png'
        }
        viva.sonido = aCartas[j_dExtras]
        j_dExtras++;
      }
    }

    if(maso.length >= 4 && mundos.length > 0) {
      estado = 'viaje'
      entrarViaje();
    } else {
      estado = 'final'
      entrarFase(finales[0]);
      playMainAudio(audioFinales[0])
      $('.pasar').text('Finalizar')
      changePalette();//COLOR
    }
  } else {
    var alertas = [
      'Para pasar tiene que quedar una carta o ninguna',
      'Podes dejar un solo personaje para después',
      'Todavía no podes irte, puede quedar un solo personaje o ninguno'
  ]
  var r = alertas.indexOf(alertas.sample());
    alertar(alertas[r], r);
  }
}

function sonidoCartas(){
  var n = 0;
  espacioCarta(n, cartasEnMesa[n].sonido);
  onEnd(mainAudio, ()=>{
    n++
    espacioCarta(n, cartasEnMesa[n].sonido);
    onEnd(mainAudio, ()=>{
      n++
      espacioCarta(n, cartasEnMesa[n].sonido);
      onEnd(mainAudio, ()=>{
        n++
        espacioCarta(n, cartasEnMesa[n].sonido);
        mainAudio.pan(0);
      })
    })
  })
}

function secuenciarCartas(n, m){
  if(audio){
    if(n < m && reproduciendoCartas){
      if(!pausa && estado == 'turno'){
        espacioCarta(n, cartasEnMesa[n].sonido);
        onEnd(cartasEnMesa[n].sonido, ()=>{
          secuenciarCartas(n+1, m)
        })
      }
    }
  }
}
