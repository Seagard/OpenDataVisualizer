import angular from 'angular';
import uirouter from 'angular-ui-router';
import material from 'angular-material';
import resource from 'angular-resource';
import _ from 'lodash';
import routing from './routes';
import am from 'angular-material/angular-material.css';

export default angular.module('main', [
  uirouter,
  material,
  resource
])
  .constant('_', window._)
  .config(routing)

require('./services/index');
require('./controllers/index');
