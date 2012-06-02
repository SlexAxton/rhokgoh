var _ = require('underscore');

exports.index = function (req, res) {
  res.render('index', {
    title : 'Express',
    built : req.query.servebuild,
    options : JSON.stringify(require('../../config/local/rhokgoh.json'))
  });
};

exports.data = function (req, res) {
  var days = [];
  for (var i = 1; i <= 31; i++) {
    days.push(
      '2012-01-' + (i < 10 ? '0'+i : i)
    );
  }
  var intervals = days.map(function (day, idx) {
    return {
      start : day,
      goals : [{
        id : '10293',
        name : 'Stop Smoking',
        success : (Math.random > 0.7 ? false : true)
      }]
    };
  });

  res.json({
    error : false,
    results : {
      interval_type : '9824',
      intervals : intervals,
      types : {
        '9824' : {
          duration : 86400000,
          name : 'Day',
          rate_phrase : "once per day"
        }
      }
    },
    count : 31
  });
};
