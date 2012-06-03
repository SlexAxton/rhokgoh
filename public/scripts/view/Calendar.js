define([
    'env',
    'backbone',
    'underscore',
    'hbs!template/calendar'
], function (Env, Backbone, _, calendarTmpl) {
  return Backbone.View.extend({
    template : calendarTmpl,

    initialize : function (data, opts) {
      this.intervalElementSet = data.intervalElementSet;
    },
    name: 'calendar',

    daySize: 23,

    render : function () {
      this.transform();
      $('svg').attr('class', this.name);
    },

    //transform this set into a calendar
    transform : function () {
      var padding = 10;
      var self = this;
      var coords;

      _.each(this.intervalElementSet, function(months, monthIndex) {
        _.each(months, function(val, index) {
          coords = self.convertIntervalToCoordinate(monthIndex, index);
          var data = val.data('meta');

          var fill = self.getFillColor(data);
          var stroke = data.blank || data.success ? 'none' : 'rgba(22,22,22,0.1)';

          val
          .attr({
            fill: fill,
            stroke: stroke
          })
          .animate(
            _.extend(
              coords,
              {
                height: self.daySize,
                width: self.daySize,
                'stroke-width': 1
              }
            ),
            500);
        });
      });

    },

    //determine fill color
    getFillColor: function(data) {
      var fill;
      if (data.blank) {
        fill = 'rgba(0,0,0,0.1)';
      }
      else if (data.success) {
        fill = 'green';
      }
      else {
        var date = new Date(data.day);
        var today = new Date();

        //if today
        if ((date.getDate() === today.getDate()) &&
              (date.getMonth() === today.getMonth()) &&
              (date.getYear() === today.getYear())) {
          console.log(data);
          fill = 'blue';
        }
        else if (+date > +today) {
          fill = 'rgba(233,233,233,1)';
        }
        else {
          //if failure
          fill = 'rgba(100,100,100,0.33)';
        }
      }

      return fill;
    },

    convertIntervalToCoordinate : function (monthIndex, index) {
      var column, row;

      column = index % 7;
      row = 0 | index / 7;

      return {
        x: (column * this.daySize) + (monthIndex * this.daySize * 8),
        y: row * this.daySize
      };
    }



  });
});
