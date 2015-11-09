angular.module('main').controller('mapController', function(DatasetFactory, FilterFactory) {
    var vm = this;
    var map;

    initMap();

    DatasetFactory.getUnitedDataset(function(data) {
        vm.datasets = data;
        dataLoaded();
    });

    function dataLoaded() {
        FilterFactory.registerOnFilterChangedEvent(function(fields) {

        });
    }

});

    var districts, coords;

     $.getJSON("/json", function( data ) { 
                districts = data;
            });        


   function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 46.4447, lng: 30.6983},
                zoom: 8
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

             google.maps.event.addListener(district, 'click', function() {
                 this.setMap(null);
            });
            }
        }
           
        function highlightArea() {


                moveMap(46.60680405,30.3363759975028);
                coords = districts[0].coords;

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

    function moveMap(lat, lng) {
        var center = new google.maps.LatLng(lat, lng);
         map.panTo(center);
         map.setZoom(10);
    }

    function removePolygon() {
         bermudaTriangle.setMap(null);
    }