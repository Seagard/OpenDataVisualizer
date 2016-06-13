angular.module('main')
    .controller('MapController', function(DatasetFactory, FilterFactory, $http, $scope) {
    var vm = this;
    var markers = [];
    vm.datasets = [];

    vm.isDataLoaded = false;

    function activate() {
        DatasetFactory.registerDatasetSelectedCb(function (dataset) {
            vm.isDataLoaded = false;
            DatasetFactory.getDatasetById(dataset.id)
                .then(function (dataset) {
                    $scope.dataset = dataset.result;
                });
        })
    }

    DatasetFactory.getDatasetList().then(function(result) {
        $scope.datasets = result;
    })
    activate();

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
        $scope.click = true;
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

    $scope.doCluster = true;

    $scope.toggleCluster = function() {
      $scope.doCluster = !$scope.doCluster;
    };

    $scope.markerImages = {
        red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
        $scope.dataset.records.forEach(function (data) {
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

        var markers = [];

    var colors = [
        {
         minValue: 0,
         maxValue:0,
         color: '#C3E1FF'
        },
        {
            minValue: 0.0001,
            maxValue:1,
            color: '#FF8AF4'
        },
        {
            minValue:1,
            maxValue:10,
            color: '#6501AB'
        },
        {
            minValue: 10,
            maxValue:30,
            color: '#010BAB'
        },
        {
            minValue: 30,
            maxValue:50,
            color: '#001AFF'
        },
        {
            minValue: 50,
            maxValue:75,
            color: '#30B8FF'
        },
        {
            minValue: 75,
            maxValue:100,
            color: '#5CFFE4'
        },
        {
            minValue: 100,
            maxValue:200,
            color: '#1FB951'
        },
        {
            minValue: 200,
            maxValue:300,
            color: '#2EFF00'
        },
        {
            minValue: 300,
            maxValue:400,
            color: '#F6FF00'
        },
        {
            minValue: 400,
            maxValue:500,
            color: '#FFCD00'
        },
        {
            minValue: 500,
            maxValue:600,
            color: '#FF9E00'
        },
        {
            minValue: 600,
            maxValue:800,
            color: '#FF7800'
        },
        {
            minValue: 800,
            maxValue:1000,
            color: '#FF3400'
        },
        {
            minValue: 1000,
            maxValue:1000000,
            color: '#FF0000'
        },
    ]

    $scope.highlightRegions = function() {
        if($scope.field) {
            $scope.dataset.records.forEach(function (data) {
                $scope.polygons.forEach(function(polygon) {
                    if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(data.lat, data.lon),
                            polygon.control.getPlurals().get(polygon.id).gObject))
                        data.area = polygon.id;
                });
                var marker = {
                    data: data
                };
                markers.push(marker);
            });

            $scope.polygons.forEach(function (polygon) {
                polygon.markers = [];
                markers.forEach(function (marker) {
                    if (marker.data.area === polygon.id)
                        polygon.markers.push(marker);
                })
            });

            $scope.polygons.forEach(function(polygon) {
                var fillColor;
                polygon.totalValue = 0;

                polygon.markers.forEach(function(item) {
                    var criteria = parseFloat(item.data[$scope.field]);

                    if(!isNaN(criteria)) {
                        polygon.totalValue += criteria;
                    }
                });

                if (polygon.totalValue == 0)  {
                    fillColor = "#C3E1FF";
                }
                else {
                    colors.forEach(function(color) {
                        if(defineRange(polygon.totalValue, color.minValue, color.maxValue))
                            fillColor = color.color;
                    });
                }

                var area = polygon.control.getPlurals().get(polygon.id).model;
                area.fill.color = fillColor;
            });
                   console.log($scope.polygons);
        } else {
            alert('Оберiть показник для вiдображення статiстики');
        }
    };

    $scope.setCriteria = function(field) {
        $scope.field = field;
    }

    $scope.removeWrongFields = function(itm) {
        return itm.id !== "lat" && itm.id !== "lon";
    }

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

