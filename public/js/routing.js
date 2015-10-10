angular.module( 'main' ).config(function($routeProvider){
    $routeProvider
        .when('/about', {
            templateUrl: '../pages/about/about.html'
        })
        .otherwise({redirectTo: '/'});
});
