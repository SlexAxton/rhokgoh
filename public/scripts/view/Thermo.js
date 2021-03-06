define([
    'env',
    'backbone',
    'jquery',
    'hbs!template/thermo'
], function (Env, Backbone, $, thermoTmpl) {
  return Backbone.View.extend({
    template : thermoTmpl,

    initialize : function (data, opts) {
      this.intervalElementSet = data.intervalElementSet;
    },
    name: 'thermo',

    size: {height: 60, width: 5},

    render : function () {
      this.transform();
      $('svg').attr('class', this.name);
    },

    //transform this set into a calendar
    transform : function () {
      var padding = 5,
          coord;

      var self = this;

      //get count of successes, dirty for now
      var totalSuccesses = this.model.get('challenge_successes').length;


      var indexSuccess = 0,
          indexBlank = 0,
          indexFailure = 0,
          challengeLength = this.model.get('challenge_duration');

      _.each(this.intervalElementSet, function(months, monthIndex) {
        _.each(months, function(val, index) {


        var success = val.data('meta').success;
        var blank = val.data('meta').blank;

        coord = self.computeThermoPosition(index * (monthIndex + 1), success, blank, indexSuccess, indexFailure, indexBlank, totalSuccesses, challengeLength);

        if (success) {
          indexSuccess++;
        }
        else if (blank) {
          indexBlank++;
        }
        else {
          indexFailure++;
        }

        val
          .attr({
            stroke: 'none',
            r: 0
          })
          .animate(_.extend(coord, {
            height: self.size['height'],
            width: blank ? 0 : self.size['width']
          }), 500);
        });

      });
    },

    computeThermoPosition: function(currentIndex, isSuccess, isBlank, indexSuccess, indexFailure, indexBlank, totalSuccesses, challengeLength) {
      var x;

      var width = this.size['width'];

      if (isSuccess) {
        x = indexSuccess * width;
      }
      else if (isBlank) {
        return {x:500,y:0,opacity:0};
        x = (totalSuccesses * width) + ((challengeLength - totalSuccesses) * width) + (indexBlank * width);
      }
      else {
        x = (totalSuccesses * width) + (indexFailure * width);
      }
      return {
        x: x,
        y: 0
      };
    }


  });
});
