const request = require('request-promise');
const config = require('../config/config');
const parseString = require('xml2js').parseString;
const County = require('../models/county');

module.exports = {
  getCountyPolygon: (req, res) => {
    getPolygonCoords(req.query.county)
            .then(polygon => {
              res.send({
                coords: polygon
              })
            })
            .catch(err => {
              res.send(err);
            });
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
                });
              });
              return Promise.all(promises);
            })
            .then(result => {
              res.send(getCountyNames(result));
            });
  }
};


function getPolygonCoords (name) {
  return County.findOne({name: name})
    .then(result => {
      return result.coords
    })
}

function transformPolygonCoords (coordinates) {
  let coordsArray = [].concat.apply([], coordinates);
  return coordsArray.map(pair => {
    return {
      lat: pair[1],
      lng: pair[0]
    };
  });
}

function getSubareaIds (details) {
  return new Promise((resolve, reject) => {
    parseString(details, function (err, result) {
      if (err) {
        reject(err);
      } else {
        let subareaIds = result.osm.relation[0].member.reduce((areaIds, member) => {
          if (member.$.role === 'subarea') {
            areaIds.push(member.$.ref);
          }
          return areaIds;
        }, []);
        resolve(subareaIds);
      }
    });
  });
}

function getCountyNames (result) {
  let countyNames = [];
  result.forEach(xml => {
    parseString(xml, (err, record) => {
      if (err) {
        console.log(err);
      } else {
        let areas = record.osm.relation[0].tag.map(tag => {
          return tag.$;
        });
        let names = areas.reduce((areaNames, record) => {
          if (record.k === 'name') {
            areaNames.push(record.v);
          }
          return areaNames;
        }, []);
        countyNames.push(names[0]);
      }
    });
  });
  return countyNames;
}
