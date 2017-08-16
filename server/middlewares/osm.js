'use strict';

const express = require('express');
const router = express.Router();
const osmController = require('../controllers/osm.controller');

router.get('/county', osmController.getCountyPolygon);
router.get('/subareas', osmController.getAllSubareas);

module.exports = router;
