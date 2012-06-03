define([
  'env',
  'backbone',
  'moment',
  'underscore',
  'Model/Interval',
  'util/tzOffset'
], function (env, Backbone, moment, _, IntervalModel, tzOffset) {
  var res = Backbone.Collection.extend({
    model : IntervalModel,

    toMonths : function (data, count) {
      var output = [];
      var offset = env.get('interval_offset');
      for (var i = 0; i < offset; i++ ) {
        output.push({
          blank : true
        });
      }

      for (var j = 0; j < 30 && j < data.length; j++) {
        output.push(data[j]);
      }

      while (output.length < 35) {
        
      }
      console.log( output, output.length );

      return data;
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
        return this.toMonths( JSON.parse( JSON.stringify(out) ) );
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
      intervals[success].set({success : true});
    });

    return intervals;
  };

  return res;
});
