'use strict';

var fs = require('fs');
var analyse = require('../analyse/analyse.js');

module.exports = function(app) {
  app.get('/api/dataset/all', function(req, res) {
    var datasets = [];
    datasets.push(JSON.parse(fs.readFileSync('data/revenue.json')));
    datasets.push(JSON.parse(fs.readFileSync('data/expence.json')));
    datasets.push(JSON.parse(fs.readFileSync('data/dataset0.json')));
    datasets.push(JSON.parse(fs.readFileSync('data/dataset1.json')));
    datasets.push(JSON.parse(fs.readFileSync('data/dataset2.json')));
    res.json(datasets);
  });

  app.get('/api/dataset/united', function(req, res) {
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
  });
}
