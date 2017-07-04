(function() {
  angular.module('main',
    [
      'ui.router',
      'ngMaterial',
      'ngResource'
    ])
    .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/map');
      $stateProvider
        .state('map', {
          url: '/map',
          templateUrl: '../pages/map.html',
          controller: 'MapController'
        })
  })
})();