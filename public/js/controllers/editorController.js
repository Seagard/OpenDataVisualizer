angular.module('main').controller('EditorController', [
  '$scope',
  '$http',
  '$timeout',
  'DatasetFactory',
  function($scope, $http, $timeout, DatasetFactory) {
    $scope.dataset = {};
    $scope.datasetOrIdentifier = '';
    $scope.isDatasetLoading = false;
    $scope.isEditingActive = false;
    $scope.loadDataset = function (datasetOrIdentifier) {
      $scope.isDatasetLoading = true;

      //Testing
      DatasetFactory.getAllDatasets(function(datasets) {
        $scope.dataset = datasets[0];

        //Imitating loading
        $timeout(function() {
          $scope.isDatasetLoading = false;
          $scope.datasetOrIdentifier = '';
          $scope.isEditingActive = true;
        }, 500);
      });

      //TODO: make request for dataset loading
    }
  }
]);