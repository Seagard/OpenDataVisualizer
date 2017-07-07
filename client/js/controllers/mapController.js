class MapController {
    constructor(Polygon) {
        this.map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: {
                lat: 46.1147226,
                lng: 29.9567193
            },
            zoom: 7
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