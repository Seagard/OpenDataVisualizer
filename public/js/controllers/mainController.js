angular.module('main').controller('mainController', function() {
    var vm = this;
    //todo do this with Angular.js
    vm.buttons = ['Дані', 'Інфографіка', 'Карта'];
    vm.selectedIndex = 0;
    //switch ($location.$$path) {
    //    case '/data':
    //        $('#dataButton').addClass('active');
    //        break;
    //    case '/graphic':
    //        $('#graphicButton').addClass('active');
    //        break;
    //    case '/map':
    //        $('#mapButton').addClass('active');
    //}
    //console.log($location.$$path);
    vm.buttonClicked = function($index) {
        vm.selectedIndex = $index;
    }
    //vm.toData = function() {
    //    removeActive();
    //    $('#dataButton').addClass('active');
    //    $location.path('/data');
    //}
    //vm.toGraphic = function() {
    //    removeActive();
    //    $('#graphicButton').addClass('active');
    //    $location.path('/graphic');
    //}
    //vm.toMap = function() {
    //    removeActive();
    //    $('#mapButton').addClass('active');
    //    $location.path('/map');
    //}
    function removeActive() {
        $('.fakelink').removeClass('active');
    }


});