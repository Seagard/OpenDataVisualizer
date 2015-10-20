'use strict';

var fs = require('fs');
var analyse = require('../../analyse/analyse.js');

function getDatasets(req, res) {
  var datasets = [];
  datasets.push(JSON.parse(fs.readFileSync('data/revenue.json')));
  datasets.push(JSON.parse(fs.readFileSync('data/expence.json')));
  res.json(datasets);
}

function getUnitedDatasets(req, res) {
  var datasets = [];
  datasets.push(JSON.parse(fs.readFileSync('data/revenue.json')));
  datasets.push(JSON.parse(fs.readFileSync('data/expence.json')));
  res.json(analyse.joinDatasets(datasets));
}

module.exports = {
  getDatasets: getDatasets,
  getUnitedDatasets: getUnitedDatasets
}
