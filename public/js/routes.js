function routing ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/map');
    $stateProvider
        .state('map', {
            url: '/map',
            templateUrl: '../pages/map.html',
            controller: 'MapController'
        })
}

export default routing;