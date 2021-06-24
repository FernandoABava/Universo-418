$(document).ready(function() {
  $('#instrucciones').hide();
  $('#creditos').hide();
  $('#config').hide();

  localStorage.setItem('audio', true);

  $('#op-inst').click(function(event) {
    $('.menu').fadeOut('400', function() {
      $('#instrucciones').fadeIn('400', function() {
      });
    });
  });

  $('#op-cred').click(function(event) {
    $('.menu').fadeOut('400', function() {
      $('#creditos').fadeIn('400', function() {
      });
    });
  });

  $('#op-config').click(function(event) {
    $('.menu').fadeOut('400', function() {
      $('#config').fadeIn('400', function() {
      });
    });
  });

  $('#config').find('input').change(function(event) {
    var b = $('#config').find('input').is(':checked');
    localStorage.setItem('audio', !b);
    console.log('Audio'+localStorage.getItem('audio'));
  });

  $('.volver').click(function(event) {
    $('.desplegable').fadeOut('400', function() {
      $('.menu').fadeIn('400', function() {
      });
    });
  });
});
