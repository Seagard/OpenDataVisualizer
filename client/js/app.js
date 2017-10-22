import angular from 'angular';
import uirouter from 'angular-ui-router';
import material from 'angular-material';
import resource from 'angular-resource';
import _ from 'lodash';
import routing from './routes';
import am from 'angular-material/angular-material.css';

import modal from 'angular-ui-bootstrap/src/modal';

export default angular.module('main', [
  uirouter,
  material,
  resource,
  modal
])
  .constant('_', window._)
  .config(routing)

require('./services/index');
require('./controllers/index');
