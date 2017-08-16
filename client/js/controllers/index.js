import angular from 'angular';
import mainController from './mainController';
import mapController from './mapController';

angular.module('main').controller('MainController', mainController);
angular.module('main').controller('MapController', mapController);
