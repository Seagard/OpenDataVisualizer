angular.module('main').controller('GraphicController', function(DatasetFactory, FilterFactory) {
    var vm = this;

    DatasetFactory.getUnitedDataset(function(dataset) {
         vm.dataset = dataset;
         setConfig(dataset);
        vm.chartConfig = {
            options: {
                type: 'Bar'
            },/*
             plotOptions: {
             series: {
             stacking: ""
             }
             },*/
            series: [
                {
                    name: 'Fact',
                    data: [parseInt(dataset.records[0].Fact)],
                    type: 'bar'
                }, {
                    name: 'Plan',
                    data: [parseInt(dataset.records[0].Plan)],
                    type: 'bar'
                }
            ],
            title: {
                text: dataset.records[0].Code
            },
            size: {
                width: 600,
                height: 450
            }
        };
    });

    function setConfig(data) {
        /*vm.chartConfig = {

            options: {
                chart: {
                    type: 'bar'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            series: [{
                data: [10, 15, 12, 8, 7]
            }],
            //Title configuration (optional)
            title: {
                text: 'Hello'
            },
            //Boolean to control showng loading status on chart (optional)
            //Could be a string if you want to show specific loading text.
            loading: false,
            //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
            //properties currentMin and currentMax provied 2-way binding to the chart's maximum and minimum
            xAxis: {
                currentMin: 0,
                currentMax: 20,
                title: {text: 'values'}
            },
            //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
            useHighStocks: false,
            //size (optional) if left out the chart will default to size of the div or something sensible.
            size: {
                width: 400,
                height: 300
            },
            //function (optional)
            func: function (chart) {
                //setup some logic for the chart
            }
        };*/

        console.log('setconfig(data);');
        console.log(data);
    }

    FilterFactory.registerOnFilterChangedEvent(function(dataset) {
        if(dataset.records) {
            vm.chartConfig = {
                options: {
                    type: 'Bar'
                },/*
                 plotOptions: {
                 series: {
                 stacking: ""
                 }
                 },*/
                series: [
                    {
                        name: 'Fact',
                        data: [parseInt(dataset.records[0].Fact)],
                        type: 'bar'
                    }, {
                        name: 'Plan',
                        data: [parseInt(dataset.records[0].Plan)],
                        type: 'bar'
                    }
                ],
                title: {
                    text: dataset.records[0].Code
                },
                size: {
                    width: 600,
                    height: 450
                }
            };
        }
    });
});