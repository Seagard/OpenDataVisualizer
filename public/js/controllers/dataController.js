angular.module('main').controller('dataController', function(DatasetFactory, FilterFactory) {
    var vm = this;

    function activate() {
        DatasetFactory.getUnitedDataset(function(data) {
            vm.dataset = data;
        });
        FilterFactory.registerOnFilterChangedEvent(function(data) {
            vm.dataset = data;
        });
    }

    activate();
});