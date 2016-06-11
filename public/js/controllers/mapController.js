angular.module('main')
    .controller('MapController', function(DatasetFactory, FilterFactory, $http, $scope) {
    var vm = this;
    var markers = [];
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
                return dataset.result.records;
            })
            .then(function(dataset) {
                $scope.dataset = dataset;
                    $scope.districts.forEach(function (data) {
                        data.memorials = [];
                        $scope.dataset.forEach(function (record) {
                            if (data.district == record.Rajon)
                                data.memorials.push(record);
                        })
                    })
            })
    }

    $scope.options = {scrollwheel: false};
    $scope.polygons = [];
    $scope.datasets = DatasetFactory.getExampleDatasets();
    $scope.showActions = false;

    $scope.events = {
        mouseover: mouseOver,
        mouseout: mouseOut,
        click: click
    }

    $scope.polygonControl = function(polygon) {
        return polygon;
    }

    function click(polygon, e, model, args) {
    }

    function mouseOver(polygon, e, model, args) {

    }

    function mouseOut(polygon, e, model, args) {

    }

    $http.get("/json").then(function (data) {
        $scope.districts = data.data;
        $scope.initialize();
        return $scope.districts;
    });

    $scope.initialize = function () {
        $scope.map = {
            center: {
                latitude: 46.748359,
                longitude: 30.150735
            },
            zoom: 7,
            markers: [],
            control: {}
        };

        var pId = 0;
        $scope.districts.forEach(function (data) {
            $scope.polygons.push({
                id: data.district,
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
                events: $scope.events,
                control: $scope.polygonControl
            });
        })
    };

    $scope.highlight = function (map) {
        $scope.clusterOpt = {
            styles: [
                {
                    url: "images/alien.png",width:63,height:93
                },
            ],
            maxZoom: 10,
            minimumClusterSize: 10,
            averageCenter: true
        }
        var i = 0;
        $scope.dataset.forEach(function (data) {
            $scope.polygons.forEach(function(polygon) {
                if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(data.lat, data.lon),
                        polygon.control.getPlurals().get(polygon.id).gObject))
                    data.area = polygon.id;
            });
            i = i+1;
            var marker = {
                id: i,
                latitude: data.lat,
                longitude: data.lon,
                data: data
            };
            map.markers.push(marker);

        });
        $scope.map.markers = map.markers;
    };

        $scope.onClick = function(marker, eventName, model) {
            console.log("Clicked!");
            model.show = !model.show;
        };

    $scope.highlightRegions = function() {
        $scope.polygons.forEach(function (polygon) {
            polygon.markers = 0;
            $scope.map.markers.forEach(function (marker) {
                if (marker.data.area === polygon.id)
                    polygon.markers++;
            })
        });

        $scope.polygons.forEach(function(polygon) {
            if (polygon.markers == 0) {
                fillColor = "#C3E1FF";
            }
            else if (defineRange(polygon.markers, 0, 10)) {
                fillColor = "blue";
            }
            else  {
                fillColor = "red";
            }
            var area = polygon.control.getPlurals().get(polygon.id).model;
            area.fill.color = fillColor;
        })
    };

    $scope.reset = function(map) {
        $scope.polygons.forEach(function(polygon) {
            var area = polygon.control.getPlurals().get(polygon.id).model;
            area.fill.color = '#C3E1FF';
        })
        $scope.map.markers = [];
    }

    function defineRange(value, min, max) {
        return value > min && value <= max;
    }
});

