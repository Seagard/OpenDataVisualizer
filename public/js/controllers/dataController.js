angular.module('main').controller('DataController', function(DatasetFactory, FilterFactory) {
    var vm = this;

    function activate() {
        //DatasetFactory.getUnitedDataset(function(data) {
        //    vm.dataset = data;
        //});
        DatasetFactory.registerOnDatasetLoadedEvent(function(data) {
            console.log('Dataset loaded: ', data.result);
            vm.dataset = data.result;
        });
        FilterFactory.registerOnFilterChangedEvent(function(data) {
            console.log('Filter changed: ', data);
            vm.dataset = data;
        });
    }

    activate();
});