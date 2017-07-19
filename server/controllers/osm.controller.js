const request = require('request-promise');
const config = require('../config/config');
const parseString = require('xml2js').parseString;

module.exports = {
    getCountyPolygon: (req, res) => {
        getCountyID(req.query)
            .then(osm_id => {
                return getPolygonCoords(osm_id);
            })
            .then(polygon => {
                res.send(polygon);
            })
    },

    getAllSubareas: (req, res) => {
        return request({
            uri: 'http://api.openstreetmap.org/api/0.6/relation/72634'
        })
        .then(details => {
            return new Promise((resolve, reject) => {
                parseString(details, function (err, result) {
                    let subareas = result.osm.relation[0].member.reduce((areas, member) => {
                        if (member.$.role === "subarea") {
                            areas.push(member.$)
                        }
                        return areas;
                    }, []);
                    resolve(subareas);
                });
            })
        })
        .then(subareas => {
            let promises = subareas.map(subarea => {
                return request({
                    uri: 'http://api.openstreetmap.org/api/0.6/relation/' + subarea.ref
                })
            })
            return Promise.all(promises)
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
            lat: pair[1],
            lng: pair[0]
        }
    })
}