import angular from 'angular';
import uirouter from 'angular-ui-router';
import material from 'angular-material';
import resource from 'angular-resource';
import routing from './routes';
import am from 'angular-material/angular-material.css'

const app = angular.module('main', [
  uirouter,
  material,
  resource
])
.config(routing);

require('./factories/index');
require('./controllers/index');