'use strict';

const portalData = require('../controllers/portalData');
const osm = require('../controllers/osm');

const express = require('express');
const router = express.Router();

router.use('/portaldata', portalData);
router.use('/osm', osm);

module.exports = router;
