define(['backbone', 'model/Checkin'], function(Backbone, Checkin) {
    return Backbone.Collection.extend({
        model: Checkin
    });
});