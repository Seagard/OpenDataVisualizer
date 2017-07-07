import angular from 'angular';
import Polygon from './polygon';

angular.module('main').service('PolygonResource', function($resource) {
    return $resource('/osm/county');
});
angular.module('main').service('Polygon', Polygon);
