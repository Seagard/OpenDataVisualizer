import angular from 'angular';
import Polygon from './polygon';
import Dataset from './dataset.service';

angular.module('main').service('PolygonResource', function ($resource) {
  return $resource('/osm/county');
});
angular.module('main').service('CountyResource', function ($resource) {
  return $resource('/osm/subareas');
});
angular.module('main').service('Polygon', Polygon);
angular.module('main').service('Dataset', Dataset);
