'use strict';

var express = require('express');
var fs = require('fs');
var app = express();

var contents = fs.readFileSync('data/regions.json');
var data = fs.readFileSync('data/data1.json');

var apiUrl = '/api';

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

/**
 *  API
 * */
//require('./api/dataset')(app);
var datasetApi = require('./api/dataset');

app.get(apiUrl + '/dataset/all', datasetApi.getAllDatasets);
app.get(apiUrl + '/dataset/united', datasetApi.getUnitedDatasets);
app.get(apiUrl + '/dataset/:id', datasetApi.getDatasetById);
app.get('/open/:id', datasetApi.loadDataset);

app.get('/json', function(req, res) {
  res.send(JSON.parse(contents));

app.get('/json1', function(req, res) {
  res.send(JSON.parse(data));
});

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


var port = 3000;
if (process.env.NODE_ENV === "production") {
  port = 80;
}

app.listen(port, function() {
  console.log('Server is listening on port ' + port + '...');
});