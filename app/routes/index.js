var _ = require('underscore');
var moment = require('moment');

exports.index = function (req, res) {
  res.render('index', {
    title : 'Express',
    built : req.query.servebuild,
    options : JSON.stringify(require('../../config/local/rhokgoh.json'))
  });
};

exports.data = function (req, res) {
  var days = [];

  // This will be per user
  // hard code it to a few days a go
  var startDay = new Date('2012-05-25');
  var todayExact = new Date();
  var todayYear = todayExact.getFullYear();
  var todayMonthNum = todayExact.getMonth()+1;
  var todayMonth = todayMonthNum < 10 ? '0'+todayMonthNum : todayMonthNum;
  var todayDayNum = todayExact.getDate();
  var todayDay = todayDayNum < 10 ? '0'+todayDayNum : todayDayNum;
  var today = new Date(todayYear + '-' + todayMonth + '-' + todayDay);

  var startOffset = startDay.getDay();

  var soFar = (today.getTime() - startDay.getTime())/86400000;

  var tmpDate;
  // also include today, even though it's not in the 'difference'
  // do a hard cap on the data at 90 points
  for (var i = 0; i <= soFar || i >= 90; i++) {
    tmpDate = new Date(startDay.getTime() + (86400000*i));
    days.push(moment(tmpDate).format('YYYY-MM-DD'));
  }

  var intervals = _(days).chain().map(function (day, idx) {
    return (Math.random() > 0.7 ? false : idx+1);
  }).compact().map(function (val){ return val-1; }).value();

  res.json({
    error : false,
    data : {
      // Alot of these would be input
      interval_type : 'day',
      interval_offset : startOffset,
      interval_start : moment(startDay).format('YYYY-MM-DD'),
      challenge_successes : intervals,
      challenge_duration : 90,
      interval_types : {
        'day' : {
          duration : 86400000,
          name : 'Day',
          rate_phrase : "once per day"
        }
      },
      challenge : {
        id : '10293',
        name : 'Stop Smoking',
        description : "This is a really long promise to my friends about smoking."
      }
    },
    count : days.length
  });
};
