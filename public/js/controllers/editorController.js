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
    $scope.loadDataset = function (url) {
      $scope.isDatasetLoading = true;

      DatasetFactory.loadDatasetFromUrl(url).then(function(resp) {
        $scope.isDatasetLoading = false;
        $scope.isEditingActive = true;
        $scope.dataset = JSON.parse(resp).result;
      });

      //TODO: make request for dataset loading
    }
  }
]);