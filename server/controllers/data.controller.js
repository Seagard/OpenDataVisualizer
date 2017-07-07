const request = require('request-promise');
const config = require('../config/config');

module.exports = {
    getCategories: (req, res) => {
        request(config.DATA_URL)
            .then(response => {
                res.send(response.data);
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
            let resources = groups.result.map(group => {
                return group.resources[0]
            })
            res.send(resources);
        });
    }
};
