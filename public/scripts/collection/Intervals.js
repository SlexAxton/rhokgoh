define([
  'backbone',
  'moment',
  'underscore',
  'Model/Interval',
  'util/tzOffset'
], function (Backbone, moment, _, IntervalModel, tzOffset) {
  var res = Backbone.Collection.extend({
    model : IntervalModel,

    toMonths : function (data, count) {
      var months = {};

      // Loop through the data, and find the available months
      _(data).forEach(function (Interval, idx) {
        console.log( Interval.start );
        var date = Interval.start;
      });

      return data;
    },

    toJSON : function (opts) {
      // SUPER!!
      var out = Backbone.Collection.prototype.toJSON.call(this);

      // Normal toJSON
      if (!opts || !opts.filter) {
        return out;
      }

      // Try to get a key/val pair
      var filterSplit = opts.filter.split('=');
      if ( filterSplit.length !== 2 ) {
        // TODO :: don't silently not filter.
        return out;
      }

      var filterType = filterSplit[0];
      var filterVal = parseInt(filterSplit[1], 10);

      // The support types
      if (filterType === 'months') {
        // Clone and own.
        return this.toMonths( JSON.parse( JSON.stringify(out) ), filterVal );
      }

      // If we get here, we sent a filter, but didn't
      // have a handler for it.
      // TODO :: don't silently not filter.
      return out;
    }
  });

  // Data normalizer
  res.normalize = function (data) {
    var intervals = [];
    var start = new Date(data.interval_start + tzOffset);
    for (var i = 0; i < data.challenge_duration; i++) {
      intervals.push(new IntervalModel({
        start : new Date(
          moment(
            start.getTime() + (86400000*i)
          ).format('YYYY-MM-DD') + tzOffset
        ),
        success : false
      }));
    }

    // Set the winning ones to successful
    _(data.challenge_successes).forEach(function (success) {
      intervals[success].success = true;
    });

    return intervals;
  };

  return res;
});
