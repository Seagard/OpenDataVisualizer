'use strict';

var http = require('http');
var fs = require('fs');
var _ = require('underscore');

var reports = [];
//http://data.ngorg.od.ua/uk/api/action/datastore/search.json?resource_id=05e29775-e7ea-4fce-8534-6a82a1d3908c&limit=5 - expence
//http://data.ngorg.od.ua/uk/api/action/datastore/search.json?resource_id=2ff71b26-3d83-490e-8895-b46390782eb9&limit=5 - revenue

//http://data.ngorg.od.ua/uk/api/action/datastore/search.json?resource_id=437b67c2-269f-41ee-973e-dd91a741c1fd&limit=5
//http://data.ngorg.od.ua/uk/api/action/datastore/search.json?resource_id=8d316559-72a9-477d-bb06-197047607c1f&limit=5
//http://data.ngorg.od.ua/uk/api/action/datastore/search.json?resource_id=5f25e8b1-6a8d-47ce-9fee-6d39a13d9db8&limit=5

//function loadData(callback) {
//  var expence = '';
//  var revenue = '';
//  var options = {
//    host: 'data.ngorg.od.ua',
//    path: '/api/action/datastore/search.json?resource_id=8821f65b-6118-4120-9ad6-87533d269b37&limit=100'
//  }
//  http.get(options, function(resp) {
//    resp.on('data', function(chunk) {
//      expence += chunk;
//    }).on('error', function(err) {
//      console.log('Error getting data:');
//      console.log(err);
//    }).on('end', function() {
//      var obj = JSON.parse(expence).result;
//      obj.type = 'expence';
//      fs.writeFile('data/expence.json', JSON.stringify(obj));
//      filesSaved();
//    });
//  });
//  options.path = '/api/action/datastore/search.json?resource_id=98fd372c-0aec-4c47-9ffd-63c5e8d545fe&limit=100';
//  http.get(options, function(resp) {
//    resp.on('data', function(chunk) {
//      revenue += chunk;
//    }).on('error', function(err) {
//      console.log('Error getting data:');
//      console.log(err);
//    }).on('end', function() {
//      var obj = JSON.parse(revenue).result;
//      obj.type = 'revenue';
//      fs.writeFile('data/revenue.json', JSON.stringify(obj));
//      filesSaved();
//    });
//  });
//
//  var filesSaved = _.after(2, function() {
//    if(callback != undefined)
//      callback();
//  });
//}

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

function joinDatasets(datasets) {
  var district = 'Біляєвський';
  var resultDataset = {};
  resultDataset.records = [];
  datasets.forEach(function(dataset) {
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

function joinDatasets2(datasets) {
  var resultDataset = {};
  resultDataset.records = [];
  datasets.forEach(function(dataset, i) {
    if(!resultDataset.fields) resultDataset.fields = dataset.fields;
    dataset.records.forEach(function(record) {
      if     (i == 0) record.year = '2012';
      else if(i == 1) record.year = '2013';
      else if(i == 2) record.year = '2014';
      resultDataset.records.push(record);
    })
  });
  return resultDataset;
}

module.exports = {
  loadData: loadData,
  joinDatasets: joinDatasets,
  joinDatasets2: joinDatasets2
};
