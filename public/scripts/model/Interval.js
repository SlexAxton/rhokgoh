define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
      initialize : function (data, opts) {
        if ( !this.get('day') ) {
          this.set({ 'day' : data.start });
        }
      }
    });
});
