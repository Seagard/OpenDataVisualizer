(function() {
  angular.module('main',
    [
      'highcharts-ng',
      'ui.router',
      'uiGmapgoogle-maps',
      'ngMaterial'
    ])
    .config(function($locationProvider, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      }).hashPrefix('!');
      $urlRouterProvider.otherwise('/data');
      $stateProvider
        .state('data', {
          url: '/data?datasetId',
          templateUrl: '../pages/data.html',
          controller: 'DataController',
          onEnter: ['$stateParams', '$rootScope', 'DatasetFactory',
            function($stateParams, $rootScope, DatasetFactory) {
              if($stateParams.datasetId)
                DatasetFactory.getDatasetById($stateParams.datasetId);
          }]
        })
        .state('graphic', {
          url: '/graphic',
          templateUrl: '../pages/graphic.html'
        })
        .state('map', {
          url: '/map',
          templateUrl: '../pages/map.html',
          controller: 'MapController'
        })
        .state('editor', {
          url: '/editor',
          templateUrl: '../pages/editor.html',
          controller: 'EditorController'
        });

        uiGmapGoogleMapApiProvider.configure({
           key: 'AIzaSyCaL34OGHlD9TpvJGoPT1MT4bZ_wJAjGNQ',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
  })
})();