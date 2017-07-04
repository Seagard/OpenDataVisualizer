const request = require('request-promise');
const config = require('../config/config');

module.exports = {
    getCountyPolygon: (req, res) => {
        getCountyID(req.query)
            .then(osm_id => {
                return getPolygonCoords(osm_id);
            })
            .then(polygon => {
                res.send(polygon);
            })
    }
};

function getCountyID(params) {
    return request({
        qs: params,
        uri: config.OSM_URL,
        json: true
    })
    .then(county => {
        return county[0].osm_id;
    });
}

function getPolygonCoords(id) {
    return request({
        qs: {
            id: id
        },
        uri: config.POLYGON_URL,
        json: true
    })
    .then((polygon) => {
        return transformPolygonCoords(polygon.geometries[0].coordinates[0]);
    })
}

function transformPolygonCoords (coordinates) {
    let coordsArray  = [].concat.apply([], coordinates);
    return coordsArray.map(pair => {
        return {
            lat: pair[0],
            lng: pair[1]
        }
    })
}