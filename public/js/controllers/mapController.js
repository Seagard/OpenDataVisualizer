angular.module('main')
    .controller('MapController', function($http, Polygon) {
    var self = this;

    self.map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });

    self.loadPolygon = function() {
        Polygon.getCountyPolygon(self.county)
            .then(function (polygon) {
                Polygon.drawPolygon(polygon, self.map);
            });

        Polygon.loadAllDistricts(self.map);
    }
});