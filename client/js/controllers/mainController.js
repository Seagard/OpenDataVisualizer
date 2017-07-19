class MainController {
  constructor(Dataset) {
    this.Dataset = Dataset;
    this.buttons = [
      {name: 'Карта', sref: 'map'}
    ];

    this.Dataset.getCategories()
      .then(categories => {
        this.categories = categories;
      });
  }

  getDatasetsByCategory(category) {
    this.Dataset.getDatasetsByCategory(category)
      .then(datasets => {
        console.log(datasets);
      })
  }


}

export default MainController;