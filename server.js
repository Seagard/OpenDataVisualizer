'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var fs = require('fs');
var app = express();
module.exports = app; // for testing

var contents = fs.readFileSync('data/regions.json');
var data = fs.readFileSync('data/data1.json');
var config = {
  appRoot: __dirname // required config
};

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  // install middleware
  swaggerExpress.register(app);
});
/**
 *  API
 * */
//require('./api/dataset')(app);
var datasetApi = require('./api/dataset');

app.get(apiUrl + '/dataset/all', datasetApi.getAllDatasets);
app.get(apiUrl + '/dataset/united', datasetApi.getUnitedDatasets);
app.get(apiUrl + '/dataset/:id', datasetApi.getDatasetById);
app.get('/open/:id', datasetApi.loadDataset);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
    res.send(JSON.parse(contents));
});

app.get('/json1', function(req, res) {
    res.send(JSON.parse(data));
});

app.listen(port, function() {
  console.log('Server is listening on port ' + port + '...');
});