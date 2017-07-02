'use strict';

const request = require('request-promise');
const express = require('express'),
    router = express.Router();
const config = require('../config/config');

router.get('/county', (req, res) => {
    let county = req.query.county;
    let format = req.query.format;
});

module.exports = router;
