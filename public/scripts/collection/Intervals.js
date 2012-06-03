define([
  'env',
  'backbone',
  'moment',
  'underscore',
  'model/Interval',
  'util/tzOffset'
], function (env, Backbone, moment, _, IntervalModel, tzOffset) {
  var res = Backbone.Collection.extend({
    model : IntervalModel,

    _toMonths : function (data, count) {
      var res = [];
      var dur = env.get('challenge_duration');
      var groups = [0,1,2];
      if (dur === 30) {
        groups = [0];
      }
      else if (dur === 60) {
        groups = [0,1];
      }

      var offset = parseInt(env.get('interval_offset'), 10);

      _(groups).forEach(function (x) {
        var output = [];
        if (res.length) {
          offset = (offset + 30) % 7;
        }

        for (var i = 0; i < offset; i++ ) {
          output.push({
            blank : true
          });
        }

        for (var j = 0; j < 30 && data.length; j++) {
          output.push(data.shift());
        }

        while (output.length < 42) {
          output.push({
            blank : true
          });
        }
        res.push(output);
      });

      return res;
    },

    toJSON : function (opts) {
      // SUPER!!
      var out = Backbone.Collection.prototype.toJSON.call(this);

      // Normal toJSON
      if (!opts || !opts.filter) {
        return out;
      }

      // The support types
      if (opts.filter === 'months') {
        // Clone and own.
        return this._toMonths( JSON.parse( JSON.stringify(out) ) );
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
      if (intervals[success]) {
        intervals[success].set({success : true});
      }
    });

    return intervals;
  };

  return res;
});
