angular.module('main').controller('filterController', function(DatasetFactory, FilterFactory) {
    var vm = this;
    vm.fields = [];

    DatasetFactory.getUnitedDataset(function(data) {
        vm.dataset = data;
        datasetsLoaded();
    });

    function datasetsLoaded() {
        vm.dataset.fields.forEach(function(dataSetField) {
            var filterField = {};
            filterField.id = dataSetField.id;
            if(dataSetField.type == 'text') {
                filterField.type = 'select';
                filterField.selectedVal = 0;
                filterField.values = [];
                vm.dataset.records.forEach(function(record, i) {
                    filterField.values.push({id: i + 1, name: record[dataSetField.id]});
                });
                //var values = [];
                //vm.dataset.records.forEach(function(record) {
                //    if(values.length != 0) {
                //        for(var i = 0; i < filterField.values.length; i++) {
                //            if(values[i] == record[dataSetField.id]) {
                //                values.push(record[dataSetField.id]);
                //            }
                //        }
                //    } else {
                //        values.push(record[dataSetField.id]);
                //    }
                //});
                //values.forEach(function(value, i) {
                //    filterField.values.push({id: i, name: value});
                //});

            }
            else if(dataSetField.type == 'int') {
                filterField.type = 'range';
                filterField.minVal = 0;
                filterField.maxVal = 0;
                filterField.values = [];
                vm.dataset.records.forEach(function(record) {
                    var value = parseInt(record[filterField.id]);
                    if(value < filterField.minVal) {
                        filterField.minVal = value;
                    } else if(value > filterField.maxVal) {
                        filterField.maxVal = value;
                    }
                });
                filterField.selectedVal = 0;
            }
            vm.fields.push(filterField);
        });
    }

    vm.applyFilter = function() {
        console.log('Apply');
        FilterFactory.notifyFilterChangedEvent(vm.fields);
    }
});