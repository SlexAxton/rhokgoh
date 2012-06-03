var _ = require('underscore');
var moment = require('moment');

exports.index = function (req, res) {
  res.render('index', {
    title : 'Challenge Home',
    built : req.query.servebuild,
    noapp : true,
    options : JSON.stringify(require('../../config/local/rhokgoh.json'))
  });
};

exports.challenge = function (req, res) {
  var options = require('../../config/local/rhokgoh.json');
  options.challenge_id = req.params.id;
  res.render('index', {
    title : 'Challenge ' + req.params.id,
    built : req.query.servebuild,
    options : JSON.stringify(options)
  });
};

exports.challenge_form = function (req, res) {
  var options = require('../../config/local/rhokgoh.json');
  options.challenge_id = req.params.id;
  res.render('challengeform', {
    title : 'Create a Challenge',
    access_token : req.param('accessToken', ''),
    built : req.query.servebuild,
    options : JSON.stringify(options)
  });
};

exports.pledge_form = function (req, res) {
  var options = require('../../config/local/rhokgoh.json');
  options.challenge_id = req.params.id;
  res.render('pledgeform', {
    title : 'Pledge',
    access_token : req.param('accessToken', ''),
    built : req.query.servebuild,
    options : JSON.stringify(options),
    challenge_id : req.params.id
  });
};
