function changePalette(mundo) {
  var cssPalette = {
    '--m-acento': '#984063',
    '--s-acento': '#F64668',
    '--m-figura': '#2a3950',
    '--s-figura': '#4c6e81',
  }

  var palette = [
    { //Canela
      '--fondo': '#ffdb99',
      '--s-fondo': '#fffe99',
      '--f-acento': '#6bb3ae'
    },
    { //Hongos
      '--fondo': '#c2d1ff',
      '--s-fondo': '#d6c2ff',
      '--f-acento': '#99ffff'
    },
    { //Frío Filoso
      '--fondo': '#eff2f5',
      '--s-fondo': '#d7e7f4',
      '--f-acento': '#fff0c4'
    },
    { //Vendavalia
      '--fondo': '#ffe999',
      '--s-fondo': '#ffdb99',
      '--f-acento': '#beb38e'
    },
    { //Algodón de azúcar
      '--fondo': '#ffe5fc',
      '--s-fondo': '#ffcce8',
      '--f-acento': '#ffdacc'
    },
    { //Playa
      '--fondo': '#cceeff',
      '--s-fondo': '#cffcfb',
      '--f-acento': '#ffeeb3'
    },
    { //Metal Imán
      '--fondo': '#d9d9d9',
      '--s-fondo': '#d1c8c1',
      '--f-acento': '#f6cda2'
    },
    { //Marmol Blanco
      '--fondo': '#efffff',
      '--s-fondo': '#bfffff',
      '--f-acento': '#a1acc4'
    }
  ]

  if(mundo != undefined){
    ca = color(palette[mundo]['--f-acento']);
    cf = color(palette[mundo]['--s-fondo']);
    bg = color(palette[mundo]['--fondo']);
    $(':root').css(cssPalette);
    $(':root').css(palette[mundo]);
  }else {
    ca = color('#984063');
    cf = color('#41436A');
    bg = color('#2a3950');
    $(':root').css({
      '--m-acento': '#FE9677',
      '--s-acento': '#F64668',
      '--f-acento': '#984063',
      '--m-figura': '#c8e9ee',
      '--s-figura': '#4c6e81',
      '--fondo': '#2a3950',
      '--s-fondo': '#41436A'
    });
  }
}

function changeCssPalette(mundo) {
  var palette = {
    '--m-acento': '#FE9677',
    '--s-acento': '#F64668',
    '--f-acento': '#984063',
    '--m-figura': '#c8e9ee',
    '--s-figura': '#4c6e81',
    '--fondo': '#2a3950',
    '--s-fondo': '#41436A'
  }

  if (mundo == 5 || mundo == 'playa') { //Good Enough? may be?
    palette = {
      '--m-acento': '#a16931',
      '--s-acento': '#ebb051',
      '--f-acento': '#da8b3d',
      '--m-figura': '#013e3e' ,
      '--s-figura': '#016568',
      '--fondo': '#45a9ac',
      '--s-fondo': '#029197'
    }
  } else if (mundo == 7 || mundo == 'marmol') { // Good Enough
    palette = {
      '--m-acento': '#314242',
      '--s-acento': '#b2b7a3',
      '--f-acento': '#817e75',
      '--m-figura': '#3e4651',
      '--s-figura': '#c4ccc1',
      '--fondo': '#d5d1c7',
      '--s-fondo': '#e9dcd4'
    }
  } else if (mundo == 0 || mundo == 'canela') { //
    palette = {
      '--m-acento': '#45a46b',
      '--s-acento': '#62ea99',
      '--f-acento': '#ea7662',
      '--m-figura': '#45a46b',
      '--s-figura': '#eec337',
      '--fondo': '#a47b45',
      '--s-fondo': '#eaaf62'
    }
  }

  ca = color(palette['--f-acento']);
  cf = color(palette['--s-fondo']);
  bg = color(palette['--fondo']);
  $(':root').css(palette);
}
