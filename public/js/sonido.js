let audioMundos = [];
let audioViajes = [];
let audioFinales = [];
let audioIntro;
let audioAtmos = [];
// let aNave = [];
let mainAudio;
let interrupcion;
let atmosAudio;

let atmosOtros = [];

let aCartas = [];

let aAlertas = [];
let aEnergia = [];
let aInstrucciones;

let audio = true;
let pausa = false;
let reproduciendoCartas = false;

let fadeTime=.15;

let posViAtmos=0;

function loadAudio(){
  audio = localStorage.getItem('audio');
  audio = audio == 'true';
  console.log('Audio '+audio);
  if(audio){
    soundFormats('mp3', 'ogg');

    for (var i = 1; i <31; i++) {
      aCartas.push(loadSound('../audio/cartas/carta' + i, ()=>{loadingBar}, err));

      if(i-1<13) aEnergia.push(loadSound('../audio/sistema/energia/' + (i-1) + 'energia', loadingBar, err))
      if(i<9){
        audioMundos.push(loadSound('../audio/mundos/mundo' + i, loadingBar, err));

        if(atmosExists(i))
          audioAtmos.push(loadSound('../audio/atmos/atmos'+i, loadingBar, err));
        else
          audioAtmos.push(undefined);
      }
      if(i-1<7) audioViajes.push(loadSound('../audio/viajes/viaje' + (i-1), loadingBar, err));
      if(i<4) aAlertas.push(loadSound('../audio/sistema/alertas/alerta' + i, loadingBar, err))
    }

    aInstrucciones = loadSound('../audio/sistema/instrucciones/controles', loadingBar, err)

    // aNave.push(loadSound('../audio/nave/puerta0'))
    // aNave.push(loadSound('../audio/nave/puerta1'))

    audioFinales.push(loadSound('../audio/puntas/final1', loadingBar, err));
    audioFinales.push(loadSound('../audio/puntas/final2', loadingBar, err));
    audioIntro =loadSound('../audio/puntas/intro', loadingBar, err);

    atmosOtros.push(loadSound('../audio/atmos/a-puntas/a-intro', loadingBar, err));
    atmosOtros.push(loadSound('../audio/atmos/a-puntas/a-viajes', loadingBar, err));
    atmosOtros.push(loadSound('../audio/atmos/a-puntas/a-final', loadingBar, err));
  }

}

function playMainAudio(sound) {
  if(audio){
    if(mainAudio){
      aFadeOut(mainAudio, fadeTime, ()=>{
        // mainAudio.stop();
        mainAudio = sound;
        puasa = false;
        aFadeIn(mainAudio, fadeTime);
        // mainAudio.play();
      })
    }else {
      mainAudio = sound;
      aFadeIn(mainAudio, fadeTime)
      puasa = false;
    }
  }
}

function loopAtmos(sound) {
  if(audio){
    if(atmosAudio)
    atmosAudio.stop();
    // aFadeOut(atmosAudio, fadeTime);
    atmosAudio = sound;
    atmosAudio.loop();
    puasa = false;
  }
}

function playAtmos(sound) {
  if(audio){
    if(atmosAudio){
      aFadeOut(atmosAudio, fadeTime, ()=>{
        // atmosAudio.stop();
        atmosAudio = sound;
        puasa = false;
        aFadeIn(atmosAudio, fadeTime);
        // atmosAudio.play();
      })
    }else {
      atmosAudio = sound;
      aFadeIn(atmosAudio, fadeTime);
      // atmosAudio.play();
      puasa = false;
    }
  }
}

function playPausa(sonido) {
  if(audio){
    if(sonido){
      if(pausa && sonido.isPlaying()){
        sonido.pause();
        reproduciendoCartas = false;
      }else if(!pausa && !sonido.isPlaying()) {
        sonido.play();
      }
    }
  }
}

function interrumpir(sonido) {
  if(sonido){
    interrupcion = sonido;
    if(!interrupcion.isPlaying()){
      reproduciendoCartas = false;
      if(mainAudio) mainAudio.pause();
      interrupcion.play();
      interrupcion.onended(()=>{
        if(mainAudio && mainAudio.isPaused()) mainAudio.play();
      })
    } else{
      retomar();
    }
  }
}

function retomar() {
  if(interrupcion){
    if(interrupcion.isPlaying()){
      interrupcion.stop();
      if(mainAudio && mainAudio.isPaused())
        mainAudio.play();
    }
  }
}

function espacioCarta(n, sound){
  var p = map(n,0,3,-.8,.8);
  if(audio){
    aFadeOut(mainAudio, fadeTime, ()=>{
      // mainAudio.stop();
      mainAudio = sound;
      mainAudio.pan(p);
      puasa = false;
      aFadeIn(mainAudio, fadeTime);
      // mainAudio.play();
    })
  }
}

function conCatMain(sonidoA, sonidoB){
  playMainAudio(sonidoA);
  setTimeout(()=>{
    if(!pausa)
      playMainAudio(sonidoB);
  }, sonidoA.duration()*1000 + 500)
}

function onEnd(sonido, callback){
  if(sonido){
    setTimeout(()=>{
      callback();
    }, sonido.duration()*1000 + 500)
  }
}

function aFadeOut(sonido, t, callback){
  sonido.setVolume(0,t);
  setTimeout(()=>{
    sonido.stop();
    if(callback) callback();
  }, t * 1000)
}

function aFadeIn(sonido, t){
  sonido.setVolume(0);
  sonido.play();
  sonido.setVolume(1,t);
}

function err() {
  console.error(`Falló la carga de uno de los sonidos. Peldaño nro ${loadCount}`);
}
