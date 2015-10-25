angular.module('main').controller('mapController', function(DatasetFactory, FilterFactory) {
    var vm = this;


    DatasetFactory.getUnitedDataset(function(data) {
        vm.datasets = data;
        dataLoaded();
    });

    function dataLoaded() {
        FilterFactory.registerOnFilterChangedEvent(function(fields) {

        });
    }
});