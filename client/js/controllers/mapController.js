class MapController {
  constructor (Polygon, Dataset, $scope) {
    this.$scope = $scope;
    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      center: {
        lat: 46.1147226,
        lng: 29.9567193
      },
      zoom: 7
    });
    this.Polygon = Polygon;
    this.Dataset = Dataset;
    this.Polygon.drawAllDistricts(this.map)
            .then(counties => {
              this.counties = counties;
            });

    this.displayDataset();
    this.markers = [];
  }

  loadPolygon () {
    this.Polygon.getCountyPolygon(this.county)
            .then(polygon => {
              this.Polygon.drawPolygon(polygon, this.map);
            });
  }

  displayDataset () {
    this.$scope.$on('getDataset', (ev, dataset) => {
      this.clearMarkers();
      this.Dataset.displayDataset(dataset, this.markers, this.map);
    });
  }

  clearMarkers () {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
  }
}

export default MapController;
