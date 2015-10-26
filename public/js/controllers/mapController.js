angular.module('main').controller('mapController', function(DatasetFactory, FilterFactory) {
    var vm = this;

    initMap();

    FilterFactory.registerOnFilterChangedEvent(function(fields) {

    });
});