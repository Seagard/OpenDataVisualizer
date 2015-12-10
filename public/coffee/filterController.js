// Generated by CoffeeScript 1.10.0
(function() {
  var FilterController;

  FilterController = (function() {
    var datasetsLoaded;

    FilterController.fields = [];

    FilterController.filteredDataset = {};

    FilterController.filteredDataset.fields = [];

    FilterController.filteredDataset.records = [];

    FilterController.FilterFactory;

    function FilterController(DatasetFactory, FilterFactory) {
      this.FilterFactory = FilterFactory;
      DatasetFactory.getUnitedDataset((function(_this) {
        return function(data) {
          _this.dataset = data;
          console.log('got datasets');
          console.log(_this.dataset);
          return datasetsLoaded();
        };
      })(this));
    }

    datasetsLoaded = function() {
      var datasetField, filterField, i, j, k, l, len, len1, len2, len3, m, record, ref, ref1, ref2, results, value, values;
      ref = FilterController.dataset.fields;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        datasetField = ref[j];
        filterField = {};
        filterField.id = datasetField.id;
        if (datasetField.type === 'text') {
          filterField.type = 'select';
          filterField.selectedVal = -1;
          filterField.values = [];
          values = [];
          ref1 = FilterController.dataset.records;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            record = ref1[k];
            if (_.contains(values, record[datasetField].id)) {
              values.push(record[datasetField].id);
            }
          }
          for (i = l = 0, len2 = values.length; l < len2; i = ++l) {
            value = values[i];
            filterField.values.push({
              id: i,
              name: value
            });
          }
        }
        if (datasetField.type === 'int') {
          filterField.type = 'range';
          filterField.minVal = 0;
          filterField.maxVal = 0;
          filterField.values = [];
          ref2 = FilterController.dataset.records;
          for (m = 0, len3 = ref2.length; m < len3; m++) {
            record = ref2[m];
            value = parseInt(record[filterField.id]);
            if (value < filterField.minVal) {
              filterField.minVal = value;
            }
            if (value > filterField.maxVal) {
              filterField.maxVal = value;
            }
            filterField.selectedVal = filterField.maxVal;
          }
        }
        FilterController.fields.push(filterField);
        results.push(FilterController.filteredDataset.fields.push(FilterController.fields));
      }
      return results;
    };

    FilterController.applyFilter = function() {
      var code, field, i, j, k, len, len1, record, recordFlags, ref, ref1, value;
      FilterController.filteredDataset.records = [];
      ref = FilterController.dataset.records;
      for (j = 0, len = ref.length; j < len; j++) {
        record = ref[j];
        recordFlags = (function() {
          var k, len1, results;
          results = [];
          for (k = 0, len1 = fields.length; k < len1; k++) {
            field = fields[k];
            results.push(false);
          }
          return results;
        })();
        ref1 = FilterController.fields;
        for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
          field = ref1[i];
          if (field.type === 'select') {
            if (field.selectedVal === -1) {
              recordFlags[i] = true;
            } else {
              code = record[field].id;
              value = field.values[field.selectedVal].name;
              if (code === value) {
                recordFlags[i] = true;
              }
            }
          }
          if (field.type === 'range') {
            if (parseInt(record[field].id <= field.selectedVal)) {
              recordFlags[i] = true;
            }
          }
        }
      }
      if (_.contains(recordFlags, false)) {
        return FilterController.filteredDataset.records.push(record);
      }
    };

    FilterController.FilterFactory.notifyFilterChangedEvent(FilterController.filteredDataset);

    return FilterController;

  })();

  angular.module('main').controller('FilterController', FilterController);

}).call(this);

//# sourceMappingURL=filterController.js.map