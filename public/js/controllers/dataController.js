angular.module('main').controller('dataController', function(DatasetFactory) {
    var vm = this;
    DatasetFactory.getUnitedDataset(function(data) {
        vm.dataset = data;
    });

});