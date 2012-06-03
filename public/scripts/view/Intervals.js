/* Parent View to switch between Calendar and Thermo views */
define([
  'state',
  'backbone',
  'underscore',
  '3rd/raphael',
  'View/Calendar',
  'View/Thermo',
  'hbs!template/intervalStateContainer'
], function (state, Backbone, _, Raphael, CalendarView, ThermoView, intervalStateTmpl) {
  return Backbone.View.extend({

    initialize : function () {
      state.bind('change', this.stateChange, this);
    },

    render: function () {
      console.log(this.collection.toJSON({filter:'months'}));
      this.$el.append( intervalStateTmpl({}) );

      //empty in memory div for initialization
      var raphaelElement = $('<div/>');
      this.raphael = Raphael( raphaelElement, 100, 200);
      this.intervalElements = this.raphael.set();


      //initialize unpresentable list of interval points
      var self = this;
      this.collection.each(function(val, key) {
        self.intervalElements.push(
          self.raphael
            .rect(0,0,0,0)
            .data("meta", val)
        );
      });

      this.$el.append(raphaelElement);
      this.stateChange();

    },

    stateChange : function () {
      console.log('state change', state);

      //grab the state from Env and render
      var viewToRender;

      var standardViewOptions = {
        el : $('.container', this.el),
        collection : this.collection,
        intervalElementSet: this.intervalElements
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
