angular.module('main').controller('filterController', function(DatasetFactory) {
    var vm = this;
    DatasetFactory.getUnitedDatasets(function(data) {
        vm.dataset = data;
    });

});