(function () {
  angular
    .module('main')
    .controller('ChartController', ChartController)

  ChartController.$inject = ['ChartService']

  function ChartController (ChartService) {
    var CHARTS = [{type: 'line', description: 'Лінійний графік'}]
    var vm = this
      ,datas = ChartService.getDatas()
      ,chartType = ChartService.getChartType()
      ,chartTitle = ChartService.getChartTitle()

    console.log(datas)

    switch (chartType) {
      case 'compare-line':
        vm.chartConfig = {
          options: {
            chart: { type: 'column' },
            title: { text: '' },
            colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
              '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
          },
          yAxis: { title: '' },
          xAxis: {
            // categories: _.map(vm.datasets[0].result.records, function (data) {
            //   var key = vm.datasets[0].selectedX[0];
            //   return data[key.charAt(0).toUpperCase() + key.slice(1)];
            // }),
            categories: datas.categories,
            title: 'test2'
          },
          series: datas.series,
          // series: [{
          //   name: vm.datasets[0].selectedY[0],
          //   data: _.map(vm.datasets[0].result.records, function (d) {
          //     return +d[vm.datasets[0].selectedY[0]]
          //   })
          // }, {
          //   name: vm.datasets[0].selectedY[1],
          //   data: _.map(vm.datasets[0].result.records, function (d) {
          //     return +d[vm.datasets[0].selectedY[1]]
          //   })
          // }],
          size: {
            width: window.innerWidth * 0.7,
            height: window.innerHeight * 0.7
          }
        }
        console.log(vm.chartConfig)
        break
      case '':
      default:
        console.warn('Something is wrong! Chart type not found.')
    }

    vm.CHARTS = CHARTS
    vm.selectedChartStyle = CHARTS[0]

    vm.config = {}
  }
})()