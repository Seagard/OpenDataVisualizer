angular.module('main').controller('mapController', function(DatasetFactory, FilterFactory) {
    var vm = this;

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


        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 46.4447, lng: 30.6983},
                zoom: 8
            });
        }
            
 
        function highlightArea() {
        /*  var e = document.getElementById("district");
            var strUser = e.options[e.selectedIndex].text;
                if(strUser == 'Біляєвський') {  */   
                    moveMap(46.571497, 30.331853);
                    var triangleCoords = [
                        {lat: 46.631412, lng: 29.962437},
                         {lat: 46.628583, lng: 30.153325},
                         {lat: 46.522384, lng: 30.658696}
        ];

  // Construct the polygon.
            var district = new google.maps.Polygon({
                paths: triangleCoords,
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
    //}
}

    function moveMap(lat, lng) {
        var center = new google.maps.LatLng(lat, lng);
         map.panTo(center);
         map.setZoom(10);
    }

    function removePolygon() {
         bermudaTriangle.setMap(null);
    }