const request = require('request-promise');
const config = require('../config/config');
const convertToUkr = require('translit-english-ukrainian');

module.exports = {
    getCategories: (req, res) => {
        request('http://data.ngorg.od.ua/uk/api/3/action/group_list')
            .then(response => {
                let result = JSON.parse(response).result;
                let categories = result.map(category => {
                   return {
                       name: category,
                       ukrName: convertToUkr(category)
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
    }
};
