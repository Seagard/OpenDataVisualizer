(function() {
  angular.module('main',
    [
      'highcharts-ng',
      'ui.router'
    ])
    .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
      //$locationProvider.html5Mode({
      //  enabled: true,
      //  requireBase: false
      //}).hashPrefix('!');
      $urlRouterProvider.otherwise('/data');
      $stateProvider
        .state('data', {
          url: '/data',
          templateUrl: '../pages/data.html',
          controller: 'DataController'
        })
        .state('graphic', {
          url: '/graphic',
          templateUrl: '../pages/graphic.html',
          controller: 'GraphicController'
        })
        .state('map', {
          url: '/map',
          templateUrl: '../pages/map.html',
          controller: 'MapController'
        })
  })
})();