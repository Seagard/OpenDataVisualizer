class Polygon {
  constructor ($resource, PolygonResource) {
    this.PolygonResource = PolygonResource;
    this.getCountyPolygon = this.getCountyPolygon.bind(this);
    this.$resource = $resource;
  }
  getCountyPolygon (county) {
    return this.PolygonResource.get({
      county: county,
      format: 'json',
      state: 'Odessa'
    }).$promise;
  }

  drawPolygon (polygon, map) {
    let poly = new google.maps.Polygon({
      paths: polygon,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    poly.setMap(map);
  }

  drawAllDistricts (map) {
    let self = this;

    return this.$resource('/osm/subareas').query().$promise
            .then(districts => {
              console.log(districts)
              let countyPromises = districts.map(county => {
                return self.getCountyPolygon(county);
              });

              return Promise.all(countyPromises);
            })
            .then(counties => {
              counties.forEach(polygon => {
                self.drawPolygon(polygon.coords, map);
              });
              return counties;
            });
  }
}

export default Polygon;
