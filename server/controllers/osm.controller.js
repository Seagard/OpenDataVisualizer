const request = require('request-promise');
const config = require('../config/config');
const parseString = require('xml2js').parseString;
const County = require('../models/county');

module.exports = {
    getCountyPolygon: (req, res) => {
        let county = {
            name: req.query.county
        };
        getCountyID(req.query)
            .then(osm_id => {
                county.osm_id = osm_id;
                County.find({ osm_id: osm_id }, (err, county) => {
                    console.log(county);
                });
                return getPolygonCoords(osm_id);
            })
            .then(polygon => {
                county.coords = polygon;
                new County(county).save(err => {
                    if (err)
                        res.send(err);
                    else res.send(county);
                })
            })
            .catch(err => {
                console.log(err);
            })
    },

    getAllSubareas: (req, res) => {
        return request({
            uri: 'http://api.openstreetmap.org/api/0.6/relation/72634'
        })
        .then(details => {
            return getSubareaIds(details);
        })
        .then(subareaIds => {
            let promises = subareaIds.map(id => {
                return request({
                    uri: `http://api.openstreetmap.org/api/0.6/relation/${id}`,
                    json: false
                })
            })
            return Promise.all(promises)
        })
        .then(result => {
            res.send(getCountyNames(result));
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

function getSubareaIds(details) {
    return new Promise((resolve, reject) => {
        parseString(details, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                let subareaIds = result.osm.relation[0].member.reduce((areaIds, member) => {
                    if (member.$.role === "subarea") {
                        areaIds.push(member.$.ref)
                    }
                    return areaIds;
                }, []);
                resolve(subareaIds);
            }
        })
    })
}

function getCountyNames(result) {
    let countyNames = [];
    result.forEach(xml => {
        parseString(xml, (err, record)=> {
            let areas = record.osm.relation[0].tag.map(tag => {
                return tag.$;
            });
            let names = areas.reduce((areaNames, record) => {
                if (record.k == "name") {
                    areaNames.push(record.v);
                }
                return areaNames;
            }, []);
            countyNames.push(names[0]);
        });
    });
    return countyNames;
}