'use strict';

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/categories', dataController.getCategories);
router.get('/categories/:category', dataController.getAvailableDatasets);
router.get('/categories/:category/:id', dataController.getDatasetData);

module.exports = router;
