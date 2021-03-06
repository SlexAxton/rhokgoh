
/**
 * Module dependencies.
 */
var util = require('util');

var express = require('express');
var hbs = require('hbs');
var _ = require('underscore');

var routes = require('./app/routes');
var api = require('./app/routes/api');
var twilioroutes = require('./app/routes/twilio');

var mongo = require('mongodb');
var MongoStore = require('connect-mongo')(express);
var twilio = require('twilio');

var app = module.exports = express.createServer();

// Configuration
express.view.register('.hbs', hbs);
app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'hbs');
  app.set('jsonp callback', true);
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'omgrhokgoh',
    store: new MongoStore({
      db: 'rhok-session'
    })
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/challenge/:id', routes.challenge);
app.get('/challenge', routes.challenge_form);
app.get('/pledge', routes.pledge_form);
api.routes('/api', app);

//twilio respond to messages
app.get('/twilio', twilioroutes.twilio);

// Twilio - Tie into an API/Database that gets messages to send?
app.get('/twiliosend', twilioroutes.twiliosend);

// Twilio - Tie into an API/Database that gets messages to send?
app.get('/twiliosendreminder', twilioroutes.twiliosendreminder);

app.listen(80, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

/* cron utilities */
var cronJob = require('cron').CronJob;
var job = new cronJob({
  cronTime: '00 00 20 * * *',
  onTick: function() {
    // Runs every day at 8pm
    // TODO: actually make this call the service for reminder service
    console.log('cron test - daily reminder job');
  },
  start: false,
  timeZone: "America/Chicago"
});
job.start();

var completejob = new cronJob({
  cronTime: '00 00 * * * *',
  onTick: function() {
    // Runs every hour
    // TODO: actually make this call the service to send notifications for sponsors of recently completed challenges
    console.log('cron test - hourly job');
  },
  start: false,
  timeZone: "America/Chicago"
});
completejob.start();

