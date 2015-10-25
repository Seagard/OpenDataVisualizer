'use strict';

var http = require('http');
var fs = require('fs');
var _ = require('underscore');

var reports = [];
//http://data.ngorg.od.ua/uk/api/action/datastore/search.json?resource_id=05e29775-e7ea-4fce-8534-6a82a1d3908c&limit=5 - expence
//http://data.ngorg.od.ua/uk/api/action/datastore/search.json?resource_id=2ff71b26-3d83-490e-8895-b46390782eb9&limit=5 - revenue

function loadData(callback) {
  var expence = '';
  var revenue = '';
  var options = {
    host: 'data.ngorg.od.ua',
    path: '/api/action/datastore/search.json?resource_id=8821f65b-6118-4120-9ad6-87533d269b37&limit=100'
  }
  http.get(options, function(resp) {
    resp.on('data', function(chunk) {
      expence += chunk;
    }).on('error', function(err) {
      console.log('Error getting data:');
      console.log(err);
    }).on('end', function() {
      var obj = JSON.parse(expence).result;
      obj.type = 'expence';
      fs.writeFile('data/expence.json', JSON.stringify(obj));
      filesSaved();
    });
  });
  options.path = '/api/action/datastore/search.json?resource_id=98fd372c-0aec-4c47-9ffd-63c5e8d545fe&limit=100';
  http.get(options, function(resp) {
    resp.on('data', function(chunk) {
      revenue += chunk;
    }).on('error', function(err) {
      console.log('Error getting data:');
      console.log(err);
    }).on('end', function() {
      var obj = JSON.parse(revenue).result;
      obj.type = 'revenue';
      fs.writeFile('data/revenue.json', JSON.stringify(obj));
      filesSaved();
    });
  });

  var filesSaved = _.after(2, function() {
    if(callback != undefined)
      callback();
  });
}

function joinDatasets(datasets) {
  var district = 'Біляєвський';
  var resultDataset = {};
  resultDataset.records = [];
  datasets.forEach((dataset) => {
    if(!resultDataset.fields) resultDataset.fields = dataset.fields;
    dataset.fields.push({id: 'district', type: 'text'});
    dataset.fields.push({id: 'type', type: 'text'});
    dataset.records.forEach(function(record) {
      record.district = district;
      record.type = dataset.type;
      resultDataset.records.push(record);
    });
  });
  //console.log('Dataset===========================');
  //console.log(require('util').inspect(resultDataset, { depth: null }));
  return resultDataset;
}

module.exports = {
  loadData: loadData,
  joinDatasets: joinDatasets
}
