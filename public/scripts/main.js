require.config({
    // default plugin settings, listing here just as a reference
    hbs : {
        templateExtension : 'hbs',
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n : true
    },
    paths : { 'template' : '../template' }
});

// Require our template with the handlebars plugin
define(['view/ProgressViz'], function (ProgressViz) {
  // Find our container
  var container = document.getElementsByTagName('body')[0];
  // Run your template function, and inject it.

  new ProgressViz({el: container});
});
