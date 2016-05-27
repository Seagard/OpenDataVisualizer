(function() {
    "use strict";
    angular
        .module('main')
        .controller('GraphicController', graphicController);

    graphicController.$inject = ['DatasetFactory', 'FilterFactory'];

    function graphicController(DatasetFactory, FilterFactory) {
        var vm = this;
        angular.extend(vm, {
            showDatasets: false,
            showGraph: false,
            datasets: []
        })

        vm.selectDatasets = function selectDatasets () {
            vm.showDatasets = true;
        }

        vm.selectedthings = function selectedthings () {
            console.log(vm.selected);
        }

        vm.displayChart = function displayChart (datasetId) {
            vm.showDatasets = false;
            vm.showGraph = true;
            datasetId = 0;
            console.log(vm.datasets[0])

            vm.chartConfig = {
                options: {
                    chart: {
                        type: 'line' // hardcore
                    },
                    title: {
                        text: 'text2'
                    },
                    colors: ['#90ed7d','#f45b5b']
                },
                yAxis: {
                    title: ''
                },
                xAxis: {
                  categories: _.map(vm.datasets[0].result.records, function (data) {
                      var key = vm.datasets[0].selectedX[0];
                      return data[key.charAt(0).toUpperCase() + key.slice(1)];
                  }),
                  title: 'test2'
                },
                series: [{
                    name: vm.datasets[0].selectedY[0],
                    data: _.map(vm.datasets[0].result.records, function (d) {
                        return +d[vm.datasets[0].selectedY[0]]
                    }) 
                }, {
                    name: vm.datasets[0].selectedY[1],
                    data: _.map(vm.datasets[0].result.records, function (d) {
                        return +d[vm.datasets[0].selectedY[1]]
                    })
                }],
                size: {
                    width: 600,
                    height: 500
                }
            };
            console.log(vm.chartConfig)
        }

        DatasetFactory.registerDatasetSelectedCb(function (data) {
            data.fields = [{id: 'code'}, {id: 'Plan'}, {id: 'Fact'}, {id: 'Fond'}]
            if (!_.has(data, 'id')) {
                console.warn('This dataset has no id');
                return;
            }
            if (_.findWhere(vm.datasets, {id: data.id})) {
                // we already have this one

                return;
            }
            DatasetFactory.getDatasetById(data.id)
              .then(function (dataset) {

                  console.log(dataset);
                  vm.datasets.push(angular.extend({}, data, dataset));


              })
              .catch(function (err) {
                  console.error(err)
              })
        })

        var graphMap = {
            'compare': ['line', 'area', 'column']
        }

        vm.options = [
            {id: 1, text: 'Line chart',      type: 'line'},
            {id: 2, text: 'Area chart',     type: 'area'},
            {id: 3, text: 'Bar chart', type: 'bar'}
        ];

        vm.selected = vm.options[0];

        DatasetFactory.getUnitedDataset(function(dataset) {
            var DEFAULT_TYPE = 'line';
            vm.dataset = dataset;
            setConfig(dataset);
            // vm.chartConfig = {
            //     options: {
            //         chart: {
            //             type: vm.selected.type
            //         },
            //         title: {
            //             text: 'title1'
            //         },
            //         colors: ['#90ed7d','#f45b5b']
            //     },
            //     yAxis: {
            //         title: ''
            //     },
            //     xAxis: {
            //         categories: _.map(vm.datasets[0].result.fields, function (field) {
            //             return field.id;
            //         }),
            //         title: 'test2'
            //     },
            //     series: [{
            //         name: 'name1',
            //         data: _.map(vm.datasets[0].result.records, function (d) {
            //             return d[vm.datasets[0].selectedY[0]]
            //         })
            //     }, {
            //         name: 'name2',
            //         data: _.map(vm.datasets[0].result.records, function (d) {
            //             return d[vm.datasets[0].selectedY[1]]
            //         })
            //     }],
            //     size: {
            //         width: 600,
            //         height: 500
            //     }
            // };
        });

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
