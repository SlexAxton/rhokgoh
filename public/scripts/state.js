define(['window', 'backbone'], function (window, Backbone) {
  window.rhokgoh = window.rhokgoh || {};
  var Env = Backbone.Model.extend({});
  window.rhokgoh.state = new Env({"state": "calendar"});
  return window.rhokgoh.state;
});
