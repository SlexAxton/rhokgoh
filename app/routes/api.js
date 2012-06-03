
var mongo = require('mongodb');
var _ = require('underscore');
var moment = require('moment');
var ObjectID = mongo.ObjectID;

var mongoServer = new mongo.Server('localhost', 27017, { auto_reconnect : true });
var db = new mongo.Db('goh', mongoServer);
db.open(function (err, db) {});
var challenges = db.collection('challenges');

// only supports get and post... probably good enough
function router(prefix, app) {
  return {
    get : function (route, cb) {
      app.get(prefix + route, cb);
    },
    post : function (route, cb) {
      app.post(prefix + route, cb);
    }
  };
}

exports.routes = function (prefix, app) {
  // make all api routes start with prefix
  app = router(prefix, app);

  // get a list of challenges, limited to 100, sorted by create time desc
  app.get('/challenge', function (req, res) {
    challenges.find({}).sort({ created : -1 }).limit(100).toArray(function (err, items) {
      res.json({
        results : items
      });
    });
  });

  // get a particular challenge
  app.get('/challenge/:id', function (req, res) {
    challenges.find({ _id : new ObjectID(req.params.id) }).toArray(function (err, items) {
      var challenge = items[0];
      var startMoment = moment(challenge.start);
      var intervals = [];
      _(challenge.success_dates).forEach(function (successDate) {
        intervals.push(
          (moment(successDate) - startMoment) / moment.duration(1, 'days')
        );
      });
      res.json({
        error : !!err,
        data : {
          // Alot of these would be input
          interval_type : 'day',
          interval_offset : startMoment.format('d'),
          interval_start : challenge.start,
          challenge_successes : intervals,
          challenge_duration : challenge.duration,
          interval_types : {
            'day' : {
              duration : 86400000,
              name : 'Day',
              rate_phrase : "once per day"
            }
          },
          challenge : {
            id : challenge._id,
            name : challenge.name,
            description : challenge.description
          }
        }
      });
    });
  });

  // check in a success
  // TODO - validate the date
  // date should be user local
  // /challenge/OBJECTID/success/YYYY-MM-DD
  app.post('/challenge/:id/success/:date', function(req, res) {
    challenges.update(
      { _id : new ObjectID(req.params.id), success_dates: { $ne : req.params.date } },
      { $push : { success_dates : req.params.date } },
      { safe : true },
      function (err) {
        res.json({
          error : !!err
        });
      }
    );
  });

  // create a challenge
  app.post('/challenge', function (req, res) {
    challenges.insert(
      {
        created : moment().valueOf(),
        // start should be user local
        start : req.param('start', moment().format('YYYY-MM-DD')),
        interval_type : req.param('interval_type', 'day'),
        duration : req.param('duration', 90),
        name : req.param('name'),
        description : req.param('description', ''),
        success_dates : []
      },
      { safe : true },
      function (err, items) {
        res.json({
          error : false,
          results : items
        });
      }
    );
  });
};