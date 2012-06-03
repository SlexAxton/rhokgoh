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
  'window',
  'jquery',
  'view/Intervals',
  'model/Interval',
  'collection/Intervals',
  'globalui/error',
  'hbs!template/container'
], function (env, state, window, $, IntervalsView, IntervalModel, IntervalCollection, globalError, containerTmpl) {
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
      remaining_challenge_duration: 10,
      amount_raised: 7*48,
      amount_potential: (7*90)-(7*32),
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

    window.fbAsyncInit = function () {
      FB.init({
        appId      : '438527712837758', // App ID
        channelUrl : env.get('api_base_url').replace('api/','') + 'channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });
    };

    document.getElementsByTagName('body')[0].innerHTML = containerTmpl(env.toJSON());

    // Load the SDK Asynchronously
    (function(d){
      var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      ref.parentNode.insertBefore(js, ref);
    }(window.document));

    mainView.render();
  });

  $dfd.fail(dataError);
});
