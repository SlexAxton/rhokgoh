
const request = require('request');

const config = require('../config/local/rhokgoh.json').fb;

exports.user = function auth (access_token, hollaback) {
  request({
    url : 'https://graph.facebook.com/me',
    qs : {
      access_token : access_token
    }
  }, function (err, res, body) {
    if (err) {
      hollaback(err);
    }
    else {
      var response = JSON.parse(body);
      if (response.error) {
        hollaback(response.error);
      }
      else {
        hollaback(null, response);
      }
    }
  });
}

