angular.module('main').controller('mainController', [
  '$rootScope', 'DatasetFactory',
  function($rootScope, DatasetFactory) {
  var vm = this;
  //vm.buttons = ['Дані', 'Інфографіка', 'Карта'];
  vm.buttons = [
    {name: 'Дані', sref: 'data'},
    {name: 'Інфографіка', sref: 'graphic'},
    {name: 'Карта', sref: 'map'},
    {name: 'Завантаження', sref: 'editor'}
  ];
  vm.selectedIndex = 0;
  vm.isDataStateActive = false;
  vm.buttonClicked = function($index) {
      vm.selectedIndex = $index;
  };

  function activate() {
    $rootScope.$on('$stateChangeStart', function(event, toState){
        vm.isDataStateActive = toState.name == 'data';
    });

    DatasetFactory.getDatasetList().then(function(datasets) {
      vm.datasetList = datasets;
    })
  }

  vm.openDataset = function(dataset) {
    //TODO: open dataset
  };

  activate();
}]);