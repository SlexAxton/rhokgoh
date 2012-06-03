require({
    hbs : {
        templateExtension : 'hbs',
        disableI18n : true
    },
    paths : { 'template' : '../template' }
},
[
  'env',
  'jquery',
  'View/Calendar',
  'Model/Interval',
  'Collection/Intervals',
  'globalui/error'
], function (env, $, CalendarView, IntervalModel, IntervalCollection, globalError) {
  var dataError = globalError.dataError;

  var $dfd = $.ajax({
    url : env.get('api_base_url') + 'fakeData.json'
  });

  $dfd.success(function (resp) {
    if (resp.error) {
      return dataError(resp.error_msg);
    }

    var data = resp.data;

    env.set({
      interval_type : data.interval_types[ resp.data.interval_type ],
      interval_offset : data.interval_offset,
      challenge_duration : data.challenge_duration
    });

    var mainView = new CalendarView({
      el : document.getElementsByTagName('body')[0],
      collection : new IntervalCollection( IntervalCollection.normalize(data) )
    });

    mainView.render();
  });

  $dfd.fail(dataError);
});
