(function () {
  angular
    .module('main')
    .controller('ChartController', ChartController)

  ChartController.$inject = ['ChartService', '$state']

  function ChartController (ChartService, $state) {
    console.log('asdasd')
    var CHARTS = [{type: 'line', description: 'Лінійний графік'}]
    var vm = this
      ,datas = ChartService.getDatas()
      ,chartType = ChartService.getChartType()
      ,chartTitle = ChartService.getChartTitle()


    vm.graphicTypes = [
      {value: 'line', name: 'Line chart'},
      {value: 'area', name: 'Area chart'},
      {value: 'bar',  name: 'Bar chart'},
      {value: 'column', name: 'Column chart'}
    ]

    vm.selected = vm.graphicTypes[0]

    vm.changeChartSettings = function changeChartSettings () {
      vm.chartConfig.options.chart.type = vm.selected.value
    }

      vm.chartConfig = {
        exporting: {
          chartOptions: { // specific options for the exported image
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: true
                }
              }
            }
          },
          scale: 3,
          fallbackToExportServer: false
        },
        options: {
          chart: { type: vm.selected.value },
          title: { text: '' },
          colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
        },
        yAxis: { title: '' },
        xAxis: {
          categories: datas.categories,
          title: 'test2'
        },
        series: datas.series,
        size: {
          width: window.innerWidth * 0.7,
          height: window.innerHeight * 0.7
        }
      }
      console.log(vm.chartConfig)


    vm.CHARTS = CHARTS
    vm.selectedChartStyle = CHARTS[0]

    vm.config = {}
  }
})()