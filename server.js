
/**
 * Module dependencies.
 */
var util = require('util');

var express = require('express');
var hbs = require('hbs');
var _ = require('underscore');

var routes = require('./app/routes');
var mongo = require('mongodb');
var MongoStore = require('connect-mongo')(express);

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

app.listen(80, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
