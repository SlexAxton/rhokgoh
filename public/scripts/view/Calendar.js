define([
    'backbone',
    'Collection/Intervals',
    'hbs!template/calendar'
], function (Backbone, Checkins, calendarTmpl) {
  return Backbone.View.extend({
    template : calendarTmpl,

    initialize : function () {},

    render : function () {
      if (false) {
       return this.transform();
      }
      this.$el.html(this.template(this.collection.toJSON()));
    },

    transform : function () {}

  });
});
