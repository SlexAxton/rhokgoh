define(['backbone', 'Model/Interval'], function (Backbone, IntervalModel) {
    return Backbone.Collection.extend({
        model : IntervalModel
    });
});
