angular.module('main')
    .factory('Polygon', function(PolygonResource) {
        return {
            getCountyPolygon: function (county) {
                return PolygonResource.query({
                    county: county,
                    format: 'json'
                }).$promise
            },
            drawPolygon: function (polygon, map) {
                var poly = new google.maps.Polygon({
                    paths: polygon,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });
                poly.setMap(map);
            },
            loadAllDistricts: function (map) {
                var districts = ['Измаильский', 'Одесса', 'Килийский'];

                var countyPromises = districts.map(function(county) {
                    return Polygon.getCountyPolygon(county);
                })

                Promise.all(countyPromises)
                    .then(function (counties) {
                        counties.forEach(function (polygon) {
                            var poly = new google.maps.Polygon({
                                paths: polygon,
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35
                            });
                            poly.setMap(self.map);
                        })
                    })
            }
        }

    });