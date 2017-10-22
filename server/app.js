'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const routes = require('./routes');
let port = 8080;

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser());
app.use(morgan('dev'));
app.use('/', routes);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../client') });
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port + '...');
});
