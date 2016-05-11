angular.module('main').controller('EditorController', [
  '$scope',
  '$http',
  '$timeout',
  'DatasetFactory',
  function($scope, $http, $timeout, DatasetFactory) {
    $scope.graphicTypes = [
      {value: 'line', name: 'Line chart'},
      {value: 'area', name: 'Area chart'},
      {value: 'bar', name: 'Bar chart'}
    ];
    $scope.geoTypes = [
      {value: 'lat', name: 'Latitude'},
      {value: 'lon', name: 'Longitude'},
      {value: 'region', name: 'Region'}
    ];

    function loadDatasetList() {
      DatasetFactory.getDatasetList().then(function(resp) {
        $scope.datasetsList = resp;
      });
    }

    loadDatasetList();

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
        loadDatasetList();
      })
    };

    $scope.cancelEdit = function() {
      $scope.isDatasetLoading = false;
      $scope.isEditingActive = false;
      $scope.dataset = {};
    };

    $scope.openDataset = function(datasetId) {
      DatasetFactory.getDatasetById(datasetId).then(function(dataset) {
        $scope.dataset = dataset.result;
        $scope.isDatasetLoading = false;
        $scope.isEditingActive = true;
      })
    }
  }
]);