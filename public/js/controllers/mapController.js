angular.module('main').controller('mapController', function(DatasetFactory, FilterFactory) {
    var vm = this;
    var districts, coords, firstSet;
    var markers = [];

    DatasetFactory.getUnitedDataset(function(data) {
        vm.datasets = data;
        dataLoaded();
    });

    function dataLoaded() {
        FilterFactory.registerOnFilterChangedEvent(function(filtered) {
            console.log(filtered);
            if(filtered.fields) {
                var fields = filtered.fields;
                for(var i = 0; i < fields.length; i++) {
                    if(fields[i].id == 'district' && fields[i].selectedVal != -1) {
                        highlightArea();
                    }

                    if(fields[i].id == 'type' && fields[i].selectedVal != -1) {
                       showPlaces();
                    }
                }
            }
        });
    }

    $.getJSON("/json1", function( data ) {
        firstSet = data;
    });

    $.getJSON("/json", function( data ) {
        districts = data;
        activate();
    });



    function activate() {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 46.748359, lng: 30.150735},
            zoom: 7
        });


        for (var i = 0; i < districts.length; i++) {
            var district = new google.maps.Polygon({
                paths: districts[i].coords,
                strokeColor: 'black',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#C3E1FF',
                fillOpacity: 0.35
            });

            district.setMap(map);

            google.maps.event.addListener(district, 'mouseover', function() {
                this.setOptions({fillColor: 'green'});
            });

            google.maps.event.addListener(district, 'mouseout', function() {
                this.setOptions({fillColor: '#C3E1FF'});
            });

        }


    }

    function highlightArea() {

        moveMap(46.60680405,30.3363759975028);

        for (var i = 0; i < districts.length; i++) {
            if(districts[i].district == 'Belyaevskiy')
                coords = districts[i].coords;
        }



        var district = new google.maps.Polygon({
            paths: coords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });

        district.setMap(map);

        google.maps.event.addListener(district, 'click', function() {
            this.setMap(null);
        });

    }

    function showPlaces() {
         
        var places = firstSet.result.records;
       for (var i = 0; i < places.length; i++) {
            var marker = new google.maps.Marker ({
                position: new google.maps.LatLng(places[i].lat, places[i].lon),
                map: map,
                info: places[i].Nazva
            });

         markers.push(marker);
            
            var infowindow = new google.maps.InfoWindow({
            content: "gjhg"
            });

            google.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.setContent(this.info);
                infowindow.open(map, this);
            });

         google.maps.event.addListener(marker, 'click', function() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            });

        }

    }

    function moveMap(lat, lng) {
        var center = new google.maps.LatLng(lat, lng);
        map.panTo(center);
        map.setZoom(10);
    }
});

