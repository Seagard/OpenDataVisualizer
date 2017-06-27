'use strict';

const portalData = require('../controllers/portalData');

const express = require('express');
const router = express.Router();

router.use('/portaldata', portalData);

module.exports = router;
