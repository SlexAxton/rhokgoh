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

          var fill = data.blank ? 'rgba(0,0,0,0.1)' : data.success ? 'green' : 'rgba(100,100,100,0.33)';
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
