angular.module('main').controller('dataController', function(DatasetFactory, FilterFactory) {
    var vm = this;
    DatasetFactory.getUnitedDataset(function(data) {
        vm.dataset = data;
        activate();
    });

    function activate() {

    }
});