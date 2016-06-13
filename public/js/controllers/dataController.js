angular.module('main').controller('DataController', function(DatasetFactory, FilterFactory) {
    var vm = this;

    vm.isDataLoaded = false;

    function activate() {
        DatasetFactory.getDatasetList().then(function(list) {
           DatasetFactory.getDatasetById(list[0].id).then(function(dataset) {
               vm.dataset = dataset.result;
           })
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