(function() {
  "use strict"
  angular
    .module('main')
    .controller('AddDatasetController', AddDatasetController)

  AddDatasetController.$inject = ['DatasetFactory', 'ChartService', '$state']

  function AddDatasetController(DatasetFactory, ChartService, $state) {
    
    console.log(ChartService.getChartType())
    var vm = this

    vm.displayChart = function displayChart () {
      ChartService.setSeries(angular.extend({
          selectedX: vm.selectedX,
          selectedY: vm.selectedY
        },
        vm.selected))
      $state.go('chart')
    }

    DatasetFactory.registerDatasetSelectedCb(function (meta) {
      if (!_.has(meta, 'id')) {
        console.warn('This dataset has no id')
        return
      }
      if (_.findWhere(vm.datasets, {id: meta.id})) {
        // we already have this one
        return
      }

      DatasetFactory.getDatasetById(meta.id)
        .then(function (dataset) {
          vm.selected = dataset.result
          console.log(vm.selected)
        })
        .catch(function (err) {
          console.error(err)
        })
    })
  }
})()