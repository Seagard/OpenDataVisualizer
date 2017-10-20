const request = require('request-promise');
const config = require('../config/config');
const CATEGORIES = require('../config/categories')

module.exports = {
  getCategories: (req, res) => {
    request('http://data.ngorg.od.ua/uk/api/3/action/group_list')
      .then(response => {
        let result = JSON.parse(response).result;
        let categories = result.map(category => {
          return {
            name: CATEGORIES[category] || category,
          };
        });
        res.send(categories);
      });
  },

  getAvailableDatasets: (req, res) => {
    request({
      qs: {
        id: req.params.category
      },
      uri: config.DATA_URL + '/group_package_show',
      json: true
    })
        .then(groups => {
          res.send(groups.result);
        });
  },

  getDatasetData: (req, res) => {
    request({
      qs: {
        resource_id: req.params.id
      },
      uri: 'http://data.ngorg.od.ua/api/action/datastore/search.json',
      json: true
    })
        .then(dataset => {
          res.send(dataset);
        })
        .catch(err => {
          res.send(err);
        });
  }
};
