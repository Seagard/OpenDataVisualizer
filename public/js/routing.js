angular.module( 'main' ).config(function($routeProvider){
    $routeProvider
        .when('/data', {
            templateUrl: '../pages/data.html'
        })
        .when('/graphic', {
            templateUrl: '../pages/graphic.html'
        })
        .when('/map', {
            templateUrl: '../pages/map.html'
        })
        .when('/editor', {
            templateUrl: '../pages/editor.html'
        })
        .otherwise({redirectTo: '/data'});
});
