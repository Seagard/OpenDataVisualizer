angular.module('main').controller('MapController', function(DatasetFactory, FilterFactory, $http, $scope) {
    var vm = this;
    var markers = [];
    //var records = DatasetFactory.getExampleDatasets()[2].result.records;
    vm.datasets = [];

    vm.isDataLoaded = false;

    function activate() {
        DatasetFactory.registerOnDatasetLoadedEvent(function(data) {
            vm.dataset = data.result;
            vm.isDataLoaded = true;
        });
    }

    DatasetFactory.getDatasetList().then(function(result) {
        $scope.datasets = result;
    })
    activate();

    $scope.getDataset = function() {
        DatasetFactory.getDatasetById($scope.selectedItem.name)
            .then(function(dataset) {
                console.log("go");
                console.log(dataset);
                return dataset.result.records;
            })
            .then(function(dataset) {
                $scope.dataset = dataset;
                //$scope.districts.forEach(function (district) {
                //    district.memorials = [];
                //
                //$scope.dataset.forEach(function (data) {
                    $scope.districts.forEach(function (data) {
                        //console.log(data);
                        data.memorials = [];
                        $scope.dataset.forEach(function (record) {
                            console.log(record);
                            if (data.district == record.Rajon)
                                data.memorials.push(record);
                        })
                    })
                //});
            })
            .then(function() {
                console.log($scope.districts);
            })
    }

    $scope.options = {scrollwheel: false};
    $scope.polygons = [];
    $scope.datasets = DatasetFactory.getExampleDatasets();
    $scope.showActions = false;

    $scope.events = {
        mouseover: mouseOver,
        mouseout: mouseOut
    }

    function mouseOver() {
        this.fill.color = "green"
    }

    function mouseOut() {
        this.fill.color = "#C3E1FF"
    }

    $http.get("/json").then(function (data) {
        $scope.districts = data.data;
        $scope.initialize();
        return $scope.districts;
    }).then(function(districts) {
        console.log($scope.dataset);


    }).then(function() {
        //$scope.districts.forEach(function (district) {
        //    district.memorials = [];
        //
        //    $scope.dataset.forEach(function (data) {
        //        district.coords.forEach(function (coords) {
        //            if (coords.longitude.toFixed(4) == data.longitude && coords.latitude == data.latitude) {
        //                data.district = district.district;
        //            }
        //        });
        //    });
        //});
        //$scope.districts.forEach(function (data) {
        //    //console.log(data);
        //    data.memorials = [];
        //    $scope.dataset.forEach(function (record) {
        //        console.log(record);
        //        if (data.district == record.district)
        //            data.memorials.push(record);
        //    })
        //})
    });

    $scope.initialize = function () {
        var promise = new Promise(function(resolve, reject) {
            resolve($scope.districts);
        })

        $scope.map = {
            center: {
                latitude: 46.748359,
                longitude: 30.150735
            },
            zoom: 7,
            markers: []
        };

        $scope.districts.forEach(function (data) {
            $scope.polygons.push({
                path: data.coords,
                stroke: {
                    color: 'black',
                    weight: 1
                },
                editable: true,
                draggable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: '#C3E1FF',
                    opacity: 0.35
                },
                events: $scope.events
            });
        })


    }

    $scope.highlight = function (map) {
        $scope.dataset.forEach(function (data) {
            var marker = {
                id: Date.now(),
                coords: {
                    latitude: data.lat,
                    longitude: data.lon
                },
                events: {
                    mouseover: onMouseOver,
                    mouseout: onMouseOut
                },
                data: data
            };
            map.markers.push(marker);
        });

        var marker1 = {
            id: Date.now(),
            coords: {
                latitude: 45.847,
                longitude: 29.6111
            }
        };
        map.markers.push(marker1);

        console.log(map.markers);
    };

    $scope.highlightRegions = function() {

        $scope.districts.forEach(function(area) {
            var fillColor;
            var length = area.memorials.length;

            if (length == 0) {
                fillColor = "#ffffff";
            }
            else if (defineRange(length, 1, 10)) {
                fillColor = "blue";
            }
            else  {
                fillColor = "red";
            }

            $scope.polygons.push({
                path: area.coords,
                stroke: {
                    color: 'black',
                    weight: 1
                },
                editable: true,
                draggable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: fillColor,
                    opacity: 0.35
                },
            });
        })
    }

    $scope.reset = function(map) {
        $scope.polygons = [];
        $scope.initialize();
    }

    function defineRange(value, min, max) {
        return value > min && value <= max;
    }

    $scope.choose = function() {
        console.log($scope.selectedItem);

        if($scope.selectedItem.name === "Пам'ятники 1 та 2 свiтових вiйн") {
            $scope.showActions = true;
        } else {
            $scope.showActions = false;
        }
    }

    function onMouseOver() {
        console.log('b');
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    function onMouseOut() {
        console.log('br');
        $scope.windowOptions.visible = false;
    };

    $scope.title = "Window Title!";
});

