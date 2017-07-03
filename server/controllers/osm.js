'use strict';

const request = require('request-promise');
const express = require('express'),
    router = express.Router();
const config = require('../config/config');

router.get('/county', (req, res) => {
    request({
            qs: {
                county: req.query.county,
                format: req.query.format
            },
            uri: config.OSM_URL,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        })
        .then(response => {
            return getPolygon(response[0].osm_id);
        })
        .then(polygon => {
            let coords = transformPolygonCoords(polygon.geometries[0].coordinates[0]);
            res.send(coords);
        })
});

function getPolygon(id) {
    return request({
        qs: {
            id: id
        },
        uri: config.POLYGON_URL,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    })
}

function transformPolygonCoords(coordinates) {
    let coordsArray  = [].concat.apply([], coordinates);
    return coordsArray.map(pair => {
        return {
            lat: pair[0],
            lng: pair[1]
        }
    })
}

module.exports = router;