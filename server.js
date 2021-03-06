'use strict';

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var contents = fs.readFileSync('data/regions.json');
var regions = JSON.parse(contents);
var data = fs.readFileSync('data/data1.json');

var apiUrl = '/api';

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser());

/**
 *  API
 * */
//require('./api/dataset')(app);
var datasetApi = require('./api/dataset');

app.get(apiUrl + '/dataset/all', datasetApi.getAllDatasets);
app.get(apiUrl + '/dataset/united', datasetApi.getUnitedDatasets);
app.get(apiUrl + '/dataset/list', datasetApi.getDatasetList);
app.post(apiUrl + '/dataset/loadfromurl', datasetApi.loadDatasetFromUrl);
app.get(apiUrl + '/dataset/:id', datasetApi.getDatasetById);
app.post(apiUrl + '/dataset/update/:id', datasetApi.updateDataset);

app.get('/open/:id', datasetApi.loadDataset);

app.get('/json', function(req, res) {
  res.send(JSON.parse(contents));
});
app.get('/json1', function(req, res) {
  res.send(JSON.parse(data));
});

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

fs.readdir(__dirname + '/datasets', function ( err, files ) {
  if (err) fs.mkdir(__dirname + '/datasets');
} );

var port = 3001;
if (process.env.NODE_ENV === "production") {
  port = 80;
}

app.listen(port, function() {
  console.log('Server is listening on port ' + port + '...');
});

app.post('/regions', function(req, res) {
  console.log(req.body);
  var regionNeeded = regions.find(function(region) {
    return region.district.indexOf(req.body.name) !== -1;
  });
  if(regionNeeded)
  res.send(regionNeeded.coords);
  else res.send('no coords');
});
