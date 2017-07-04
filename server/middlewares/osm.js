'use strict';

const express = require('express'),
    router = express.Router();
const osmController = require('../controllers/osm.controller');

router.get('/county', osmController.getCountyPolygon);

module.exports = router;