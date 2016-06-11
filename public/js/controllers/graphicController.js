(function() {
    "use strict";
    angular
        .module('main')
        .controller('GraphicController', graphicController)

    graphicController.$inject = ['$state', 'ChartService']

    function graphicController($state, ChartService) {
      var vm = this
      angular.extend(vm, {
          showDatasets: false,
          showGraph: false,
          datasets: []
      })
      vm.gallery = [{
          type: 'compare-line',
          description: 'Порівняти дані',
          thumbnail: '/images/compare-line.svg'
      }, {
          type: 'compare-timeline',
          description: 'Порівняння на відрізку часу',
          thumbnail: '/images/compare-timeline.svg'
      }, {
          type: 'compare-complex',
          description: 'Cкладні порівняння',
          thumbnail: '/images/compare-complex.svg'
      }, {
          type: 'pie-chart',
          description: 'Кругова діаграма',
          thumbnail: '/images/pie-chart.svg'
      }];

      vm.selectGraphType = function selectGraphType (type) {
        console.log(type, ' selected')
        ChartService.setChartType(type)
        $state.go('add-dataset')
      }
      vm.selectedthings = function selectedthings () {
          console.log(vm.selected);
      }

      // vm.displayChart = function displayChart (datasetId) {
      //     vm.showDatasets = false;
      //     vm.showGraph = true;
      //     datasetId = 0;
      //     console.log(vm.datasets[0])
      //
      // }

      var graphMap = {
          'compare': ['line', 'area', 'column']
      }

      vm.options = [
          {id: 1, text: 'Line chart',      type: 'line'},
          {id: 2, text: 'Area chart',     type: 'area'},
          {id: 3, text: 'Bar chart', type: 'bar'}
      ];

      vm.selected = vm.options[0];

      // DatasetFactory.getUnitedDataset(function(dataset) {
      //     var DEFAULT_TYPE = 'line';
      //     vm.dataset = dataset;
      //     setConfig(dataset);
      // });

      function setConfig(data) {
          console.log('setconfig(data);');
          console.log(data);
      }

      vm.changeChartSettings = function() {
          console.log(vm.selected);
          vm.options.type = vm.selected.type;
          _.each(vm.chartConfig.series, (s) => { s.type = vm.selected.type });
          console.log(vm.chartConfig.series);
      };
    }
})();
