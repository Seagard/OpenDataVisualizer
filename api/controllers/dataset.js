'use strict';

var fs = require('fs');
var analyse = require('../../analyse/analyse.js');

function getDatasets(req, res) {
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
}

module.exports = {
  getDatasets: getDatasets,
  getUnitedDataset: getUnitedDatasets
};
