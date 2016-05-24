angular.module('main').controller('FilterController', function(DatasetFactory, FilterFactory) {
    var vm = this;
    vm.fields = [];

    vm.filteredDataset = {};
    vm.filteredDataset.fields = [];
    vm.filteredDataset.records = [];

    vm.datasets = DatasetFactory.getExampleDatasets();

    DatasetFactory.getUnitedDataset(function(data) {
        vm.dataset = data;
        console.log(vm.dataset);
        datasetsLoaded();
    });

    DatasetFactory.registerOnDatasetLoadedEvent(function(data) {
        console.log('Dataset loaded: ', data.result);
        vm.dataset = data.result;
        datasetsLoaded();
    });

    function datasetsLoaded() {
        vm.dataset.fields.forEach(function(dataSetField) {
            var filterField = {};
            filterField.id = dataSetField.id;
            if(dataSetField.type == 'text') {
                filterField.type = 'select';
                filterField.selectedVal = -1;
                filterField.values = [];
                var values = [];
                vm.dataset.records.forEach(function(record) {
                    if(!_.contains(values, record[dataSetField.id]))
                        values.push(record[dataSetField.id]);
                });
                values.forEach(function(value, i) {
                     filterField.values.push({id: i, name: value});
                });
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
                filterField.selectedVal = filterField.maxVal;
            } else if(dataSetField.type == 'float') {
                filterField.type = 'range';
                filterField.minVal = 0;
                filterField.maxVal = 0;
                filterField.values = [];
                vm.dataset.records.forEach(function(record) {
                    var value = parseFloat(record[filterField.id]);
                    if(value < filterField.minVal) {
                        filterField.minVal = value;
                    } else if(value > filterField.maxVal) {
                        filterField.maxVal = value;
                    }
                });
                filterField.selectedVal = filterField.maxVal;
            }
            vm.fields.push(filterField);
            vm.filteredDataset.fields = vm.fields;
        });
    }

    vm.applyFilter = function() {
        vm.filteredDataset.records = [];
        vm.dataset.records.forEach(function(record) {
            var recordFlags = [];
            for(var i = 0; i < vm.fields.length; i++) {
                recordFlags.push(false);
            }
            vm.fields.forEach(function(field, i) {
                if(field.type == 'select') {
                    if(field.selectedVal == -1) {
                        recordFlags[i] = true;
                    } else {
                        var code = record[field.id];
                        var value = field.values[field.selectedVal].name;
                        if(code == value) {
                            recordFlags[i] = true;
                        }
                    }
                } else if(field.type == 'range') {
                    if(parseInt(record[field.id]) <= field.selectedVal) {
                        recordFlags[i] = true;
                    }
                }
            });
            if(!_.contains(recordFlags, false)) {
                vm.filteredDataset.records.push(record);
            }
        });

        FilterFactory.notifyFilterChangedEvent(vm.filteredDataset);
    }
});