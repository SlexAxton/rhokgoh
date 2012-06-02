define([
    'backbone',
    'collection/Checkins',
    'hbs!template/viz'
    ], function(Backbone, Checkins) {
  var ProgressViz = Backbone.View.extend({
    className: "testing",

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html('hey');
    },
    
    transformTo: function(state) {

    }

  });

  return ProgressViz;
});