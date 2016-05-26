angular.module('main').controller('DataController', function(DatasetFactory, FilterFactory) {
    var vm = this;

    vm.isDataLoaded = false;

    function activate() {
        DatasetFactory.getUnitedDataset(function(data) {
            vm.dataset = data;
            vm.isDataLoaded = true;
        });
        DatasetFactory.registerOnDatasetLoadedEvent(function(data) {
            console.log('Dataset loaded: ', data.result);
            vm.dataset = data.result;
            vm.isDataLoaded = true;
        });
        FilterFactory.registerOnFilterChangedEvent(function(data) {
            console.log('Filter changed: ', data);
            vm.dataset = data;
        });
        DatasetFactory.registerDatasetSelectedCb(function(dataset) {
            vm.isDataLoaded = false;
            DatasetFactory.getDatasetById(dataset.id);
        });
    }

    activate();
});