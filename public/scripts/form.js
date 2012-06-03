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

  var $form = $('#challenge_form');

  $form.delegate('#rg-form-field-duration input[type=radio]', 'click', function (e) {
    var $radio = $(e.currentTarget);
    $('#rg-form-field-duration li').removeClass('rg-duration-selected');
    $radio.closest('li').addClass('rg-duration-selected');
  });

  $form.submit(function (e) {
    $.ajax({
      type: 'POST',
      url: env.get('api_base_url') + 'challenge',
      data: $form.serialize(),
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if (data && !data.error) {
          alert('Thanks!');
        } else {
          alert('Something broke dude :(');
        }
      }
    })
  });

  $('#rg-form-field-start-date').datepicker({
    dateFormat : 'yy-mm-dd'
  });

});
