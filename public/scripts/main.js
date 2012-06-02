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

  $dfd.success(function (data) {
    if (data.error) {
      return dataError(data.error_msg);
    }

    var mainView = new CalendarView({
      el : document.getElementsByTagName('body')[0],
      collection : new IntervalCollection(data.results.intervals)
    });

    mainView.render();
  });

  $dfd.fail(dataError);
});
