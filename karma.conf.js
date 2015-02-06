module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/sprintf/dist/sprintf.min.js',
      'app/+(login|projects|services|tasks)/*.js'
    ],
    exclude: [],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'app/+(login|projects|services|tasks)/!(*-test).js': ['coverage']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [],
    singleRun: false
  });
};
