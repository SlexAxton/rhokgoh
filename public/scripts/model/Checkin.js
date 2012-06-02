define('backbone', function(Backbone) {
    return Backbone.Model.extend({
        day: new Date()
    });
});