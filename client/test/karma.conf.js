module.exports = function (config) {
  config.set({
    basePath: '../../',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'client/pages/*.html',
      'client/*.js',
      'client/test/*.test.js'
    ],
    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/pages'
    },
    exclude: [],
    preprocessors: {
      '../../client/pages/*.html': 'ng-html2js'
    },
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      require('karma-ng-html2js-preprocessor')
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
