(function() {
    "use strict";
    angular
        .module('main')
        .controller('GraphicController', graphicController);

    graphicController.$inject = ['DatasetFactory', 'FilterFactory'];

    function graphicController(DatasetFactory, FilterFactory) {
        var vm = this;

        var hardcore = {
            type: 'compare',
            title: 'Порівняння наборів даних X і Y',
            commonField: 'year',
            datasets: [{
                name: 'Населення',
                meta: {
                    fieldsToAnalyze: ['population'],
                    fieldsMeta: {
                        year: {
                            max: 2015,
                            min: 2010,
                            unitOfMeasurement: 'Роки'
                        },
                        population: {
                            max: 12909,
                            min: 9300,
                            unitOfMeasurement: 'Населення'
                        }
                    }
                },
                data: [{
                    year: 2010,
                    population: 10354
                }, {
                    year: 2011,
                    population: 11043
                }, {
                    year: 2012,
                    population: 12909
                }, {
                    year: 2013,
                    population: 10001
                }, {
                    year: 2014,
                    population: 9534
                }, {
                    year: 2015,
                    population: 8500
                }]
            }, {
                name: 'Викиди промисловості',
                meta: {
                    fieldsToAnalyze: ['wastes'],
                    fieldsMeta: {
                        year: {
                            max: 2015,
                            min: 2010,
                            unitOfMeasurement: 'Роки'
                        },
                        wastes: {
                            max: 876,
                            min: 432,
                            unitOfMeasurement: 'Тонни'
                        }
                    }
                },
                data: [{
                    year: 2010,
                    wastes: 500
                }, {
                    year: 2011,
                    wastes: 432
                }, {
                    year: 2012,
                    wastes: 450
                }, {
                    year: 2013,
                    wastes: 723
                }, {
                    year: 2014,
                    wastes: 800
                }, {
                    year: 2015,
                    wastes: 876
                }]
            }]
        }

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
            vm.chartConfig = {
                options: {
                    chart: {
                        type: vm.selected.type
                    },
                    title: {
                        text: hardcore.title
                    },
                    colors: ['#90ed7d','#f45b5b']
                },
                yAxis: {
                    title: ''
                },
                xAxis: {
                    categories: _.range(hardcore.datasets[0].meta.fieldsMeta[hardcore.commonField].min,
                                        hardcore.datasets[0].meta.fieldsMeta[hardcore.commonField].max + 1),
                    title: {text: hardcore.datasets[0].meta.fieldsMeta[hardcore.commonField].unitOfMeasurement}
                },
                series: [{
                    name: hardcore.datasets[0].name,
                    data: _.map(hardcore.datasets[0].data, function (d) {
                        return d[hardcore.datasets[0].meta.fieldsToAnalyze[0]]
                    })
                }, {
                    name: hardcore.datasets[1].name,
                    data: _.map(hardcore.datasets[1].data, function (d) {
                        var hardcodedCoefficient = 11;
                        return hardcodedCoefficient * d[hardcore.datasets[1].meta.fieldsToAnalyze[0]]
                    })
                }],
                size: {
                    width: 600,
                    height: 500
                }
            };
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




//
//    FilterFactory.registerOnFilterChangedEvent(function(dataset) {
//        console.log(dataset);
//        if(dataset.records) {
//            vm.chartConfig = {
//                options: {
//                    type: 'Bar'
//                },/*
//                 plotOptions: {
//                 series: {
//                 stacking: ""
//                 }
//                 },*/
//                series: [
//                    {
//                        name: 'Fact',
//                        data: [parseInt(dataset.records[0].Fact)],
//                        type: 'bar'
//                    }, {
//                        name: 'Plan',
//                        data: [parseInt(dataset.records[0].Plan)],
//                        type: 'bar'
//                    }
//                ],
//                title: {
//                    text: dataset.records[0].Code
//                },
//                size: {
//                    width: 600,
//                    height: 450
//                }
//            };
//        }
//    });
//}]);