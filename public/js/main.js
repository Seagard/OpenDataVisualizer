(function() {
  angular.module('main',
    [
      'ui.router',
        'chart.js'
    ])
    .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      }).hashPrefix('!');
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('data', {
          url: '/?datasetId',
          templateUrl: '../pages/graphic.html',
          controller: 'GraphicController',
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
  })
})();