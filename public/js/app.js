let entornos;
let inters;
let d_cartas;
let intro;
let finales;
let i_dExtras = 0;
let j_dExtras = 0;

let maso = [];
let mundos;
let viajes;
let vida = 9;
let max = 12;

let cartasEnMesa = [];

let estado = 'menu';

var loadCount = 0;

function preload() {
  $('.alerta').hide();
  $('.puntos').hide();
  $('.carta').hide();

  $('#p5_loading').append(`<div id="l-bar"
    style="background-color: #4c6e81; width: 0%; height: 1rem; margin: 0px auto 0px">
    <div>`);
  loadAudio();

  finales = loadStrings('../txt/finales.txt'); //No tiene callback
  intro = loadStrings('../txt/intro.txt',()=>{});
  inters = loadStrings('../txt/viajes.txt',()=>{});
  entornos = loadStrings('../txt/entornos.txt', ()=>{});
  d_cartas = loadStrings('../txt/cartas.txt');
}

function setup(){
  $('#reproducir').show();
  iniciarSketch();
  console.log({aCartas});
}

$(document).ready(function() {
  $('#reproducir').hide();
  $('#ingame').hide();

  $('#reproducir').find('button').click(function(event) {
    $('#reproducir').hide();
    $('#ingame').show();
    iniciar();
  });

  // iniciar();

});


function iniciar(){
  vida = 9;
  maso = [];
  mundos = entornos.slice();
  viajes = inters.slice();
  estado = 'intro';
  i_dExtras = 0;
  j_dExtras = 0;

  $('.hp').text('Energía: ' + vida)
  $('.pasar').off();
  $('.pasar').click((ev)=>{
    console.log(estado);
    salirDeEstado();
  })

  for (var i = 0; i < 24; i++) {
    var e = (i % 6) + 1;
    e = i < 12 ? e * -1 : e;
    var img;
    // if(imgExists(i+4)){
      img = 'img/carta'+(i+4)+'.png';
    // }else {
    //   img = 'img/cartaLisa.png'
    // }
    var c = {
      descripcion: d_cartas[i + 3],
      img: img,
      sonido: aCartas[i+3],
      energia: e,
    }

    maso.push(c);
  }

  introducir();
  acciones();
}

function salirDeEstado(){
  if(estado === 'intro'){
    //CUANDO ESTOY EN EL ESTADO ENTORNO
    salirIntro(entrarMundo, 'entorno');
    $('.pasar').text('Continuar')
  }else if(estado === 'viaje'){
    //CUANDO ESTOY EN EL ESTADO ENTORNO
    salirViaje(entrarMundo, 'entorno');
    $('.pasar').text('Continuar')
  }else if(estado === 'entorno') {
    //CUANDO ESTOY EN EL ESTADO TURNO
    salirMundo();
    $('.pasar').text('Despegar')
  }else if (estado === 'turno') {
    //CUANDO ESTOY EN EL ESTADO VIAJE
    $('.pasar').text('Aterrizar')
    pasar();
  }else if (estado === 'final') {
    location.href = 'index.html';
  }
}

function loadingBar() {
  loadCount++;
  $('#l-bar').css('width', loadCount/46 * 100 + '%');
}
