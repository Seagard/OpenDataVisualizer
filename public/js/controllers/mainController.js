angular.module('main').controller('mainController', function($location) {
    var vm = this;
    vm.hello = 'Hello from Angular.js';
    vm.toAbout = function() {
        $location.path('/about');
    }
});