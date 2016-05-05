angular.module('main').controller('MapController', function(DatasetFactory, FilterFactory, $http, $scope) {
    var vm = this;
    var markers = [];
    var records = DatasetFactory.getExampleDatasets()[2].result.records;
    ;
    vm.datasets = [];

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
        districts.forEach(function (district) {
            district.memorials = [];

            records.forEach(function (data) {
                district.coords.forEach(function (coords) {
                    if (coords.longitude == data.longitude && coords.latitude == data.latitude) {
                        data.district = district.district;
                    }
                });
            });
        });
    }).then(function() {
        $scope.districts.forEach(function (data) {
            data.memorials = [];
            records.forEach(function (record) {
                if (data.district == record.district)
                    data.memorials.push(record);
            })
        })
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
        records.forEach(function (data) {
            var marker = {
                id: Date.now(),
                coords: {
                    latitude: data.latitude,
                    longitude: data.longitude
                },
                events: {
                    mouseover: onMouseOver,
                    mouseout: onMouseOut
                },
                data: data
            };
            map.markers.push(marker);
        });
    };

    $scope.highlightRegions = function() {

        $scope.districts.forEach(function(area) {
            var fillColor;
            var length = area.memorials.length;

            if (length == 0) {
                fillColor = "#ffffff";
            }
            if (length == 1) {
                fillColor = "blue";
            }
            if (length >= 2) {
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

