define(['window', 'backbone'], function (window, Backbone) {
  window.rhokgoh = window.rhokgoh || {};
  var Env = Backbone.Model.extend({});
  window.rhokgoh.env = new Env(window.rhokgoh.options || {});
  window.rhokgoh.options = undefined;
  return window.rhokgoh.env;
});
