class MapController {
    constructor(Polygon) {
        this.map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 8
        });
        this.Polygon = Polygon;
    }

    loadPolygon() {
        this.Polygon.getCountyPolygon(this.county)
            .then(polygon => {
                this.Polygon.drawPolygon(polygon, this.map);
            });
    }
}

export default MapController;