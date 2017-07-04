const request = require('request-promise');
const config = require('../config/config');

module.exports = {
    getCategories: (req, res) => {
        request('http://data.ngorg.od.ua/uk/api/3/action/group_list')
            .then(response => {
                res.send(response);
            });
    }
};
