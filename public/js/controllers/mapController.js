angular.module('main').controller('MapController', function(DatasetFactory, FilterFactory, $http, $scope) {
    var districts;
    var vm = this;
    var markers = [];
    var records = [];
    vm.datasets = [];
    vm.map = {};

    $http.get("/json").then(function (data) {
        districts = data.data;
        vm.initialize();
    })

    vm.initialize = function () {
        return new Promise(function (resolve, reject) {
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 46.748359, lng: 30.150735},
                zoom: 7,
                panControl: true, //enable pan Control
                zoomControl: true, //enable zoom control
                events: {
                    click: function() {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(46, 25),
                            map: $scope.map
                        });
                    }
                }
            });

            districts.forEach(function (data) {
                var district = new google.maps.Polygon({
                    paths: data.coords,
                    strokeColor: 'black',
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: '#C3E1FF',
                    fillOpacity: 0.35
                });

                district.setMap($scope.map);

                district.addListener('mouseover', function () {
                    this.setOptions({fillColor: 'green'});
                });

                district.addListener('mouseout', function () {
                    this.setOptions({fillColor: '#C3E1FF'});
                });
            })
            resolve($scope.map);
        })
        .then(function () {
            records = DatasetFactory.getExampleDatasets()[2].result.records;

            records.forEach(function (data) {
                districts.forEach(function (district) {
                    district.coords.forEach(function (coords) {
                        if (coords.lng == data.lon && coords.lat == data.lat) {
                            data.district = district.district;
                        }
                    });
                });

                var infowindow = new google.maps.InfoWindow({
                    content: data.Naimenovanie + '<br>' +
                    'Location: ' + data.Location + '<br>' + 'Coordinates: ' + data.lat + ' ' + data.lon + '<br>' +
                    'District: ' + data.district
                });

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data.lat, data.lon),
                    map: $scope.map
                });

                marker.addListener('mouseover', function () {
                    infowindow.open($scope.map, marker);
                });

                marker.addListener('mouseout', function () {
                    infowindow.close();
                });

            });
        })
        .then(function () {
            districts.forEach(function (district) {
                district.memorials = [];

                records.forEach(function (data) {
                    if (district.district == data.district)
                        district.memorials.push(data);
                });
            });
        })
        .then(function () {
            districts.forEach(function (data) {
                var length = data.memorials.length;
                var fillColor;

                if (length == 0) {
                    fillColor = "#ffffff";
                }
                if (length == 1) {
                    fillColor = "blue";
                }
                if (length == 2) {
                    fillColor = "red";
                }

                var district = new google.maps.Polygon({
                    paths: data.coords,
                    strokeColor: 'black',
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: fillColor,
                    fillOpacity: 0.35
                });

                district.setMap($scope.map);
            })
        });
    };

    $scope.highlight = function () {
        $scope.$watch('map', function() {
            if($scope.map) {
                records = DatasetFactory.getExampleDatasets()[2].result.records;

                console.log($scope.map);



                alert('highlight');
                console.log(marker);
            }

        })


        //records.forEach(function (data) {
        //    districts.forEach(function (district) {
        //        district.coords.forEach(function (coords) {
        //            if (coords.lng == data.lon && coords.lat == data.lat) {
        //                data.district = district.district;
        //            }
        //        });
        //    });

            //var infowindow = new google.maps.InfoWindow({
            //    content: data.Naimenovanie + '<br>' +
            //    'Location: ' + data.Location + '<br>' + 'Coordinates: ' + data.lat + ' ' + data.lon + '<br>' +
            //    'District: ' + data.district
            //});
            //
            //
            //marker.addListener('mouseover', function () {
            //    infowindow.open($scope.map, marker);
            //});
            //
            //marker.addListener('mouseout', function () {
            //    infowindow.close();
            //});

    }
});

