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

    render : function () {
      this.transform();
      $('svg').attr('class', this.name);
    },

    //transform this set into a calendar
    transform : function () {
      var padding = 10;
      var self = this;
      var coords;

      _.each(this.intervalElementSet, function(val, index) {
        coords = self.convertDateToCoordinate(val.data("meta").get("day"), index);
        var success = val.data("meta").get("success");
        val.animate(
          _.extend(
            coords,
            {
              height:10,
              width: 10,
              fill: success ? '#BADA55' : '#888'
            }
          ),
          500);
      });

    },

    convertDateToCoordinate : function (date, index) {
      var dateObj = new Date(date),
          month = 0;

      if (index > 61) {
        month = 2;
      }
      else if (index > 31) {
        month = 1;
      }

      return {
        x: (dateObj.getDay() * 10) + month * 80,
        y: ((0 | dateObj.getDate() / 7) * 10)
      };
    }



  });
});
