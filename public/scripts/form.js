require({
    hbs : {
        templateExtension : 'hbs',
        disableI18n : true
    },
    paths : { 'template' : '../template' }
},
[
  'env',
  'state',
  '3rd/jquery-ui'
], function (env, state, $) {

  var $cForm = $('#challenge_form');
  var $pForm = $('#pledge_form');

  if ($cForm) {
    $cForm.delegate('#rg-form-field-duration input[type=radio]', 'click', function (e) {
      var $radio = $(e.currentTarget);
      $('#rg-form-field-duration li').removeClass('rg-duration-selected');
      $radio.closest('li').addClass('rg-duration-selected');
    });

    $cForm.submit(function (e) {
      $.ajax({
        type: 'POST',
        url: env.get('api_base_url') + 'challenge',
        data: $cForm.serialize(),
        dataType: 'json',
        success: function (data) {
          if (data && !data.error) {
            alert('Thanks!');
          } else {
            alert('Something broke dude :(');
          }
        }
      });
    });

    $('#rg-form-field-start-date').datepicker({
      dateFormat : 'yy-mm-dd'
    });
  }

  if ($pForm) {
    $pForm.submit(function (e) {
      $.ajax({
        type: 'POST',
        url: env.get('api_base_url') + 'challenge/' + rhokgoh.env.get('challenge_id') + '/pledge',
        data: $pForm.serialize(),
        dataType: 'json',
        success: function (data) {
          if (data && !data.error) {
            alert('Thanks!');
          } else {
            alert('Something broke dude :(');
          }
        }
      });
    });
  }


});
