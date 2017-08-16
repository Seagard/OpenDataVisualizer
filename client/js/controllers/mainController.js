class MainController {
  constructor (Dataset, $scope) {
    this.Dataset = Dataset;
    this.buttons = [
      {name: 'Карта', sref: 'map'}
    ];
    this.$scope = $scope;

    this.Dataset.getCategories()
      .then(categories => {
        this.categories = categories;
      });
  }

  getDatasetsByCategory (category) {
    this.currentCategory = category;
    this.Dataset.getDatasetsByCategory(category)
      .then(datasets => {
        this.datasets = datasets;
      });
  }

  displayDataset (dataset) {
    this.Dataset.getDatasetData(this.currentCategory, dataset.resources[0].id)
      .then(dataset => {
        this.$scope.$broadcast('getDataset', {
          ds: dataset
        });
      });
  }
}

export default MainController;
