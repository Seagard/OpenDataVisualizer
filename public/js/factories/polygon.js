class Polygon {
    constructor(PolygonResource) {
        this.PolygonResource = PolygonResource;
        this.getCountyPolygon = this.getCountyPolygon.bind(this);
    }
    getCountyPolygon(county) {
        return this.PolygonResource.query({
            county: county,
            format: 'json'
        }).$promise
    }

    drawPolygon(polygon, map) {
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

    loadAllDistricts(map) {
        let districts = ['Измаильский', 'Одесса', 'Килийский'];
        let self = this;
        let countyPromises = districts.map(county => {
            return self.getCountyPolygon(county);
        });

        Promise.all(countyPromises)
            .then(counties => {
                counties.forEach(polygon => {
                    self.drawPolygon(polygon, map);
                })
            })
    }
}

export default Polygon;