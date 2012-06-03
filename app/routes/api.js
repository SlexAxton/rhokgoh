
var mongo = require('mongodb');
var _ = require('underscore');
var moment = require('moment');
var ObjectID = mongo.ObjectID;

var fb = require('../../lib/fb');

var mongoServer = new mongo.Server('localhost', 27017, { auto_reconnect : true });
var db = new mongo.Db('goh', mongoServer);
db.open(function (err, db) {});
var challenges = db.collection('challenges');
var usersCollection = db.collection('users');
var pledgesCollection = db.collection('pledges');

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

function createChallenge (req, user, hollaback) {
  challenges.find({ uid : user.id }).toArray(function (err, items) {
    // LOL HACKZ
    var shortkey = 65; // 'A'
    for (var x = 0; x < items.length; x++) {
      var item = items[x];
      if (item.shortkey === String.fromCharCode(shortkey)) {
        shortkey++;
      }
    }

    challenges.insert(
      {
        created : moment().valueOf(),
        // start should be user local
        start : req.param('start', moment().format('YYYY-MM-DD')),
        interval_type : req.param('interval_type', 'day'),
        duration : req.param('duration', 90),
        name : req.param('name'),
        description : req.param('description', ''),
        // defaulting to blank string for now... but it should probably be required
        campaign : req.param('campaign', ''),
        success_dates : [],
        lat : req.param('lat'),
        lng : req.param('lng'),
        uid : user.id,
        shortkey : String.fromCharCode(shortkey)
      },
      { safe : true },
      hollaback
    );
  });
}

function createPledge (req, user, hollaback) {
  pledgesCollection.insert(
    {
      created : moment().valueOf(),
      uid : user.id,
      challenge : req.param('challenge_id'),
      amount : req.param('amount'),
      total : req.param('total'),
      email : req.param('email'),
      anonymous : req.param('anonymous') === 'on',
      reminder : req.param('reminder') === 'on',
      phone : req.param('phone')
    },
    { safe : true },
    hollaback
  );
}

exports.routes = function (prefix, app) {
  // make all api routes start with prefix
  app = router(prefix, app);

  app.get('/pledge', function (req, res) {
    pledgesCollection.find({}).sort({ created : -1 }).limit(100).toArray(function (err, items) {
      res.json({
        results : items
      });
    });
  });

  app.post('/pledge', function (req, res) {
    // Get the user's FB data using the access token.
    fb.user(req.param('access_token'), function (err, user) {
      if (err) {
        // UNDO SOMEDAY
        // res.json({ error : err, results : [] });
        user = { id : 1 };
      }

      usersCollection.find({ uid : user.id }).toArray(function (err, users) {
        if (users.length === 1) {
          createPledge(req, user, function (err, items) {
            res.json({ error : false, results : items });
          });
        }
        else {
          usersCollection.insert({
            uid : user.id,
            email : req.param('email'),
            phone_number : req.param('phone'),
            name : req.param('name')
          },
          { safe : true },
          function (err, users) {
            createPledge(req, user, function (err, items) {
              res.json({ error : false, results : items });
            });
          });
        }
      });
    });
  });

  app.get('/pledge/:id', function (req, res) {
    pledgesCollection.find({ _id : new ObjectID(req.params.id) }).toArray(function (err, items) {
      var pledge = items[0];
      if (pledge) {
        res.json({
          error : !!err,
          data : {
            created : moment().valueOf(),
            challenge_id : pledge.challenge_id,
            amount : pledge.amount,
            total : pledge.total,
            email : pledge.email,
            anonymous : pledge.anonymous,
            reminder : pledge.reminder,
            phone : pledge.phone
          }
        });
      } else {
        res.json({
          error : true,
          data : {}
        });
      }
    });
  });

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
      if (challenge) {
        var startMoment = moment(challenge.start);
        var intervals = [];
        _(challenge.success_dates).forEach(function (successDate) {
          intervals.push(
            Math.round((moment(successDate) - startMoment) / moment.duration(1, 'days'))
          );
        });
        res.json({
          error : !!err,
          data : {
            // Alot of these would be input
            interval_type : 'day',
            interval_offset : parseInt(startMoment.format('d')),
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
      } else {
        res.json({
          error : true,
          data : {}
        });
      }
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
    // Get the user's FB data using the access token.
    fb.user(req.param('access_token'), function (err, user) {
      if (err) {
        // UNDO SOMEDAY
        // res.json({ error : err, results : [] });
        user = { id : 1 };
      }

      usersCollection.find({ uid : user.id }).toArray(function (err, users) {
        if (users.length === 1) {
          createChallenge(req, user, function (err, items) {
            res.json({ error : false, results : items })
          });
        }
        else {
          usersCollection.insert({
            uid : user.id,
            email : req.param('email'),
            phone_number : req.param('phone_number'),
            name : req.param('name')
          },
          { safe : true },
          function (err, users) {
            createChallenge(req, user, function (err, items) {
              res.json({ error : false, results : items });
            });
          });
        }
      });
    });
  });
};
