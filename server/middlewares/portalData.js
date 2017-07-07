'use strict';

const request = require('request');
const express = require('express'),
    router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/categories', dataController.getCategories);
router.get('/categories/:category', dataController.getAvailableDatasets);

module.exports = router;