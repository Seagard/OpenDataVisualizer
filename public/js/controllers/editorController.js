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
        $scope.dataset = resp.result;
      });
    };

    $scope.save = function() {
      DatasetFactory.updateDataset($scope.dataset).then(function() {
        $scope.isDatasetLoading = false;
        $scope.isEditingActive = false;
      })
    }
  }
]);