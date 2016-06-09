'use strict';

var fs = require('fs');
var http = require('http');
var URL = require('url');
var queryString = require('querystring');
var analyse = require('../analyse/analyse.js');
var _ = require('underscore');

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
      if(!fs.existsSync('datasets/' + datasetId + '.json'))
        fs.writeFile('datasets/' + datasetId + '.json', JSON.stringify(resp));
      res.redirect('/?datasetId=' + datasetId);
    }
  }).catch(function(err) {
    res.json(err);
  });
}

function loadDatasetFromUrl(req, res) {
  var url = URL.parse(req.body.url);
  var datasetId = queryString.parse(url.query).resource_id;
  if(fs.existsSync('datasets/' + datasetId + '.json')) {
    var data = fs.readFileSync('datasets/' + datasetId + '.json').toString();
    res.json(JSON.parse(data));
  } else {
    loadData(url.host, url.path).then(function(resp) {
      if(!fs.existsSync('datasets/' + datasetId + '.json')) {
        var data = JSON.parse(resp);
        data.result.name = datasetId;
        data.result.fields.forEach(function(field) {
          field.id = field.id.toLowerCase();
        });
        fs.writeFileSync('datasets/' + datasetId + '.json', JSON.stringify(data));
      }
      res.send(data);
    }).catch(function(err) {
      console.error(err);
      res.status(500).json(err);
    })
  }
}

function getDatasetById(req, res, next) {
  var datasetId = req.params.id;
  if(datasetId == 'undefined') {
    res.status(406).send('Dataset id required');
  } else {
    if(fs.existsSync(__dirname + '/../datasets/' + datasetId + '.json'))
      res.send(JSON.parse(fs.readFileSync(__dirname + '/../datasets/' + datasetId + '.json')));
    else res.status(404).send('Dataset not found');
  }
}

function getDatasetList(req, res) {
  var datasets = [];
  var files = fs.readdirSync(__dirname + '/../datasets');
  var fileReaded = _.after(files.length, function() {
    res.send(datasets);
  });
  files.forEach(function(fileName, index) {
    fs.readFile(__dirname + '/../datasets/' + fileName, function(err, file) {
      var json = file.toString();
      var dataset = JSON.parse(json).result;
      datasets.push({
        id: fileName.replace('.json', ''),
        name: dataset.name
      });
      fileReaded();
    });
  })
}

function updateDataset(req, res) {
  var datasetId = req.params.id;
  var data = req.body.dataset;
  var dataset = JSON.parse(fs.readFileSync('datasets/' + datasetId + '.json').toString());
  dataset.result = data;
  fs.writeFileSync('datasets/' + datasetId + '.json', JSON.stringify(dataset));
  res.status(200).json({status: 'OK'});
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
  getDatasetById,
  getDatasetList,
  loadDatasetFromUrl,
  updateDataset
};
