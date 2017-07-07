angular.module('main')
    .service('PolygonResource', function($resource) {
        return $resource('/osm/county');
    });


class PolygonResource {

}

export default PolygonResource;