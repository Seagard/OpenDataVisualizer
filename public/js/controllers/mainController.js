angular.module('main').controller('mainController', [
  '$rootScope', 'DatasetFactory',
  function($rootScope, DatasetFactory) {
  var vm = this;
  //vm.buttons = ['Дані', 'Інфографіка', 'Карта'];
  vm.buttons = [
    {name: 'Дані', sref: 'data'},
    {name: 'Інфографіка', sref: 'list'},
    {name: 'Карта', sref: 'map'},
    {name: 'Завантаження', sref: 'editor'}
  ];
  vm.selectedIndex = 0;
  vm.isDataStateActive = false;
  vm.buttonClicked = function($index) {
      vm.selectedIndex = $index;
  };
  vm.selectedTab = 0;

  function activate() {
    $rootScope.$on('$stateChangeStart', function(event, toState){
        vm.isDataStateActive = toState.name == 'data';
        vm.selectedTab = 1;
    });

    DatasetFactory.registerOnDatasetUploadedEvent(function() {
      DatasetFactory.getDatasetList().then(function(datasets) {
        vm.datasetList = datasets;
      })
    });

    DatasetFactory.getDatasetList().then(function(datasets) {
      vm.datasetList = datasets;
    })
  }
  vm.openDataset = function(dataset) {
    // DatasetFactory.getDatasetById(dataset.name); This will not work!
    DatasetFactory.notifyDatasetSelected(dataset);
    //TODO: open dataset
  };

  activate();
}]);