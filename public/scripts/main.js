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
  'jquery',
  'View/Intervals',
  'Model/Interval',
  'Collection/Intervals',
  'globalui/error',
  'hbs!template/container'
], function (env, state, $, IntervalsView, IntervalModel, IntervalCollection, globalError, containerTmpl) {
  var dataError = globalError.dataError;

  //set initial state
  var $dfd = $.ajax({
    url : env.get('api_base_url') + 'challenge/' + env.get('challenge_id')
  });

  $dfd.success(function (resp) {
    if (resp.error) {
      return dataError(resp.error_msg);
    }

    var data = resp.data;
    console.log('data', data);
    env.set({
      interval_type : data.interval_types[ resp.data.interval_type ],
      interval_offset : data.interval_offset,
      challenge_duration : data.challenge_duration,
      interval_start : data.interval_start,
      challenge : data.challenge,
      challenge_successes: data.challenge_successes,
      remaining_challenge_duration: 47,
      amount_raised: 77,
      amount_potential: 377,
      number_of_pledgers: 2,
      daily_pledge_total: 7,
      challenger_name: 'Mark',
      pledgers: [
        {imgUrl: '/images/mark.jpg', pledge_amount: 2, name: 'Mark'},
        {imgUrl: '/images/slex.jpg', pledge_amount: 5, name: 'Alex'}
      ]
    });

    var mainView = new IntervalsView({
      el : document.getElementsByTagName('body')[0],
      collection : new IntervalCollection( IntervalCollection.normalize(data) ),
      model: env
    });

    document.getElementsByTagName('body')[0].innerHTML = containerTmpl(env.toJSON());


    mainView.render();
  });

  $dfd.fail(dataError);
});
