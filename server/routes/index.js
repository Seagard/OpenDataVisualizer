'use strict';

const express = require('express');
const router = express.Router();

const portalData = require('../middlewares/portalData');
const osm = require('../middlewares/osm');

router.use('/portaldata', portalData);
router.use('/osm', osm);

module.exports = router;
