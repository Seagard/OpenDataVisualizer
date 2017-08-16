class Dataset {
  constructor ($resource) {
    this.$resource = $resource;
  }

  getCategories () {
    return this.$resource('/portaldata/categories').query().$promise;
  }

  getDatasetsByCategory (name) {
    return this.$resource('/portaldata/categories/:name', {name: name}).query().$promise;
  }

  getDatasetData (name, id) {
    return this.$resource('/portaldata/categories/:name/:id', {name: name, id: id})
            .get().$promise;
  }

  displayDataset (dataset, markers, map) {
    dataset.ds.result.records.forEach(record => {
      let marker = new google.maps.Marker({
        position: {lat: parseFloat(record.lat), lng: parseFloat(record.lon)},
        map: map
      });
      markers.push(marker);
    });
  }
}

export default Dataset;
