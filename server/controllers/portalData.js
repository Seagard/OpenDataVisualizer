'use strict';

const request = require('request');
const express = require('express'),
    router = express.Router();

router.get('/categories', (req, res) => {
    request('http://data.ngorg.od.ua/uk/api/3/action/group_list', (error, response, body) => {
        res.send(JSON.parse(body).result);
    });
});

module.exports = router;
