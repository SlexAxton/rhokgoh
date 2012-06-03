define([
    'backbone',
    'hbs!template/calendar'
], function (Backbone, calendarTmpl) {
  return Backbone.View.extend({
    template : calendarTmpl,

    initialize : function () {},

    render : function () {
      if (false) {
       return this.transform();
      }
      this.$el.html(this.template(this.collection.toJSON({
        filter : 'months=3'
      })));
    },

    transform : function () {}

  });
});
