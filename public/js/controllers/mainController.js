angular.module('main').controller('mainController', [
  '$rootScope', function($rootScope) {
  var vm = this;
  vm.buttons = [
    {name: 'Дані', sref: 'data'},
    {name: 'Інфографіка', sref: 'list'},
    {name: 'Карта', sref: 'map'},
    {name: 'Завантаження', sref: 'editor'}
  ];

}]);