(function() {
  angular.module('main',
    [
      'highcharts-ng',
      'ui.router',
      'uiGmapgoogle-maps'
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
          templateUrl: '../pages/graphic.html',
          controller: 'GraphicController'
        })
        .state('map', {
          url: '/map',
          templateUrl: '../pages/map.html',
          controller: 'MapController'
        })

        uiGmapGoogleMapApiProvider.configure({
           key: 'AIzaSyCaL34OGHlD9TpvJGoPT1MT4bZ_wJAjGNQ',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
  })
})();