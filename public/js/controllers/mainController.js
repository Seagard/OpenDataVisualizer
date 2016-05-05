angular.module('main').controller('mainController', function($rootScope, $timeout, $state) {
    var vm = this;
    //todo do this with Angular.js
    vm.buttons = ['Дані', 'Інфографіка', 'Карта'];
    vm.selectedIndex = 0;
    vm.isDataStateActive = false;
    vm.buttonClicked = function($index) {
        vm.selectedIndex = $index;
    };

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
          vm.isDataStateActive = toState.name == 'data';
      });
});