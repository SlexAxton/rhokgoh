/* Parent View to switch between Calendar and Thermo views */
define([
  'state',
  'backbone',
  'underscore',
  '3rd/jquery.fancybox',
  '3rd/raphael',
  'View/Calendar',
  'View/Thermo'
], function (state, Backbone, _, $, Raphael, CalendarView, ThermoView, intervalStateTmpl) {
  return Backbone.View.extend({

    initialize : function () {
      state.bind('change', this.stateChange, this);
    },

    events: {
      "click .rg-button-secondary" : "makeChallenge"
    },
    makeChallenge : function (e) {
      $.fancybox.open({
        autoSize : false,
        fitToView : false,
        fixed : false,
        autoCenter : false,
        padding : 0,
        minWidth: 700,
        switchContentOnly : true,
        type : 'iframe',
        href : 'http://local.rhokgoh.com/challenge'
      });
    },

    render: function () {
      console.log(this.collection.toJSON({filter:'months'}));

      //empty in memory div for initialization
      var raphaelElement = $('<div/>');
      this.raphael = Raphael( 'interval_wrapper', 100, 90 * 10);
      this.intervalElements = [this.raphael.set(), this.raphael.set(), this.raphael.set()];
      var months = [];


      //initialize unpresentable list of interval points
      var self = this, i = 0;
      _.each(this.collection.toJSON({filter: 'months'}), function(month, key) {
        _.each(month, function(day) {
          self.intervalElements[i].push(
            self.raphael
              .rect(0,0,0,0)
              .data("meta", day)
          );
        });
        i++;
      });

      this.stateChange();

    },

    stateChange : function () {
      console.log('state change', state);

      //grab the state from Env and render
      var viewToRender;

      var standardViewOptions = {
        el : $('.container', this.el),
        collection : this.collection,
        intervalElementSet: this.intervalElements,
        model: this.model
      };

      if (state.get('state') === 'calendar') {
        viewToRender = new CalendarView(standardViewOptions);
      }
      else {
        viewToRender = new ThermoView(standardViewOptions);
      }

      viewToRender.render();
    }


    });

});
