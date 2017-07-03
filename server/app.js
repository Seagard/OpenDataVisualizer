'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const morgan = require('morgan');

const app = express();
const routes = require('./routes');
let port = 8080;

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser());
app.use(morgan('dev'));
app.use('/', routes);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port + '...');
});