define([
    'env',
    'backbone',
    'hbs!template/thermo'
], function (Env, Backbone, thermoTmpl) {
  return Backbone.View.extend({
    template : thermoTmpl,

    initialize : function (data, opts) {
      this.intervalElementSet = data.intervalElementSet;
    },
    name: 'thermo',

    render : function () {
      this.transform();
    },

    //transform this set into a calendar
    transform : function () {
      var padding = 5,
          coord;

      var self = this;

      //get count of successes, dirty for now
      var totalSuccesses = _.filter(this.intervalElementSet, function(val) {
        return val.data("meta").get("success");
      }).length;

      var indexSuccess = 0;

      _.each(this.intervalElementSet, function(val, index) {
        if (index === 1) console.log('thur', val.data("meta"));

        var success = val.data('meta').get("success");

        if (success) {
          indexSuccess++;
        }

        coord = self.computeThermoPosition(val, index, indexSuccess, success, totalSuccesses);

        val.animate(_.extend(coord, {
          height:20,
          width: 5}), 1000);
      });
    },

    computeThermoPosition: function(val, index, indexSuccess, isSuccess, numSuccess) {
      var x, y;

      x = isSuccess ? 0 + indexSuccess * 5 : 0 + (numSuccess + (index - indexSuccess)) * 5;

      return {
        x: x,
        y: 0
      };
    }


  });
});
