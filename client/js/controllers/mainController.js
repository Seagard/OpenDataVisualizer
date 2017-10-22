class MainController {
  constructor (Dataset, $scope, $uibModal) {
    this.Dataset = Dataset;
    this.buttons = [
      {name: 'Карта', sref: 'map'}
    ];
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.datasets = [];

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

  backToCategories() {
    this.datasets = [];
  }

  displayDataset (dataset) {
    this.Dataset.getDatasetData(this.currentCategory, dataset.resources[0].id)
      .then(dataset => {
        this.$scope.$broadcast('getDataset', {
          ds: dataset
        });
      })
      .catch(err => {
        this.$uibModal.open({
          templateUrl: "../../pages/modals/errorModal.html"
        })
        console.error(err)
      })
  }
}

export default MainController;
