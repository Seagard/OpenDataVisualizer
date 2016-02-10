'use strict';

var fs = require('fs');
var http = require('http');
var analyse = require('../analyse/analyse.js');

function getAllDatasets(req, res) {
  var datasets = [];
  datasets.push(JSON.parse(fs.readFileSync('data/revenue.json')));
  datasets.push(JSON.parse(fs.readFileSync('data/expence.json')));
  datasets.push(JSON.parse(fs.readFileSync('data/dataset0.json')));
  datasets.push(JSON.parse(fs.readFileSync('data/dataset1.json')));
  datasets.push(JSON.parse(fs.readFileSync('data/dataset2.json')));
  res.json(datasets);
}

function getUnitedDatasets(req, res) {
  var datasets = [];
  if(req.query.id) {
    switch(parseInt(req.query.id)) {
      case 1:
        datasets = [];
        datasets.push(JSON.parse(fs.readFileSync('data/revenue.json')));
        datasets.push(JSON.parse(fs.readFileSync('data/expence.json')));
        res.json(analyse.joinDatasets(datasets));
        break;
      case 2:
        datasets = [];
        datasets.push(JSON.parse(fs.readFileSync('data/dataset1.json')));
        datasets.push(JSON.parse(fs.readFileSync('data/dataset0.json')));
        datasets.push(JSON.parse(fs.readFileSync('data/dataset2.json')));
        res.json(analyse.joinDatasets2(datasets));
        break;
    }
  } else {
    datasets = [];
    datasets.push(JSON.parse(fs.readFileSync('data/revenue.json')));
    datasets.push(JSON.parse(fs.readFileSync('data/expence.json')));
    datasets.push(JSON.parse(fs.readFileSync('data/dataset1.json')));
    datasets.push(JSON.parse(fs.readFileSync('data/dataset0.json')));
    datasets.push(JSON.parse(fs.readFileSync('data/dataset2.json')));
    res.json(analyse.joinDatasets2(datasets));
  }
}

function loadDataset(req, res) {
  var datasetId = req.params.id;
  loadData('data.ngorg.od.ua',
    '/api/action/datastore/search.json?resource_id=' + datasetId)
  .then(function(resp) {
    if(resp.match(/Caught exception.*does not exist/)) {
      console.log('[Error] Dataset ' + datasetId + ' not found');
      res.redirect('/');
    } else {
      if(!fs.existsSync('data/' + datasetId + '.json'))
        fs.writeFile('data/' + datasetId + '.json', JSON.stringify(resp));
      res.redirect('/?datasetId=' + datasetId);
    }
  }).catch(function(err) {
    res.json(err);
  });
}

function getDatasetById(req, res, next) {
  var datasetId = req.params.id;
  if(datasetId == 'undefined') {
    res.status(406).send('Dataset id required');
  } else {
    if(fs.existsSync('data/' + datasetId + '.json'))
      res.send(JSON.parse(fs.readFileSync('data/' + datasetId + '.json')));
    else res.status(404).send('Dataset not found');
  }
}

function loadData(host, path) {
  return new Promise(function(resolve, reject) {
    var result = '';
    var options = {
      host: host,
      path: path
    };

    http.get(options, function(resp) {
      resp.on('data', function(chunk) {
        result += chunk;
      }).on('error', function(err) {
        reject(err);
      }).on('end', function() {
        resolve(result);
      });
    });
  })
}

module.exports = {
  getAllDatasets,
  getUnitedDatasets,
  loadDataset,
  getDatasetById
};
