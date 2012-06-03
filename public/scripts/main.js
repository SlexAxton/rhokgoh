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
  'globalui/error'
], function (env, state, $, IntervalsView, IntervalModel, IntervalCollection, globalError) {
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

    env.set({
      interval_type : data.interval_types[ resp.data.interval_type ],
      interval_offset : data.interval_offset,
      challenge_duration : data.challenge_duration,
      interval_start : data.interval_start,
      challenge : data.challenge
    });

    var mainView = new IntervalsView({
      el : document.getElementsByTagName('body')[0],
      collection : new IntervalCollection( IntervalCollection.normalize(data) )
    });

    mainView.render();
  });

  $dfd.fail(dataError);
});
