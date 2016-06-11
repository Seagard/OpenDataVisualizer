(function () {
  angular
    .module('main')
    .service('ChartService', ChartService)

  function ChartService () {
    var datasets = {}
      ,chartType = ''
      ,chartTitle = ''

    this.setChartType = function (type) {
      chartType = type
    }

    this.getChartType = function getChartType () {
      return chartType
    }

    this.getChartTitle = function getChartTitle () {
      return chartTitle
    }

    this.setSeries = function addSeries (dataset) {
      datasets.series =_.map(dataset.selectedY, function (selected) {
        return {
          name: selected,
          data: _.map(dataset.records, function (record) {
            return +record[selected]
          })
        }
      })
      datasets.categories = _.map(dataset.records, function (record) {
        return record[dataset.selectedX]
      })
    }

    this.getDatas = function getDatas () {
      return datasets
    }

    this.clear = function clear () {
      datasets = {}
      chartType = ''
    }

    // todo: implement!
    function adaptData (data) {
      return data
    }
  }
})()