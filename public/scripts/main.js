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
    url : env.get('api_base_url') + 'fakeData.json'
  });

  $dfd.success(function (data) {
    if (data.error) {
      return dataError(data.error_msg);
    }

    var mainView = new IntervalsView({
      el : document.getElementsByTagName('body')[0],
      collection : new IntervalCollection(data.results.intervals)
    });

    mainView.render();
  });

  $dfd.fail(dataError);
});
