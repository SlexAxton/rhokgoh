/* Parent View to switch between Calendar and Thermo views */
define([
  'state',
  'backbone',
  'underscore',
  '3rd/jquery.fancybox',
  '3rd/raphael',
  'view/Calendar',
  'view/Thermo'
], function (state, Backbone, _, $, Raphael, CalendarView, ThermoView, intervalStateTmpl) {
  return Backbone.View.extend({

    initialize : function () {
      state.bind('change', this.stateChange, this);
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
    },

    events : {
      "click svg" : "triggerStateChange",
      "click .rg-button-secondary" : "makeChallenge",
      "click .rg-button-primary" : "makePledge"
    },

    makePledge : function (e) {
      var self = this;
      FB.login(function (response) {
        if (response.authResponse) {
          $.fancybox.open({
            autoSize : false,
            fitToView : false,
            fixed : false,
            autoCenter : false,
            padding : 0,
            minWidth: 540,
            switchContentOnly : true,
            type : 'iframe',
            href : 'http://local.rhokgoh.com/pledge?accessToken=' + response.authResponse.accessToken + '&id=' +
              self.model.get('challenge_id')
          });
        }
      });
    },

    makeChallenge : function (e) {
      FB.login(function (response) {
        if (response.authResponse) {
          $.fancybox.open({
            autoSize : false,
            fitToView : false,
            fixed : false,
            autoCenter : false,
            padding : 0,
            minWidth: 540,
            switchContentOnly : true,
            type : 'iframe',
            href : 'http://local.rhokgoh.com/challenge?accessToken=' + response.authResponse.accessToken
          });
        }
      });
    },

    triggerStateChange : _.throttle(function () {

      var newState = "";
      if (state.get('state') === 'calendar') {
        newState = 'thermo';
      } else {
        newState = 'calendar';
      }
      window.rhokgoh.state.set({state: newState});

      }, 0)
    ,



    });

});
