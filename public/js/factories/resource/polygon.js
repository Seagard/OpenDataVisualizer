angular.module('main')
    .factory('PolygonResource', function($resource) {
        return $resource('/osm/county');
    });
