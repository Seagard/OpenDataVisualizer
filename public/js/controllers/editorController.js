angular.module('main').controller('EditorController', [
  '$scope',
  '$http',
  '$timeout',
  'DatasetFactory',
  '$mdToast',
  function($scope, $http, $timeout, DatasetFactory, $mdToast) {
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
    $scope.dataset = {};
    $scope.datasetOrIdentifier = '';
    $scope.isDatasetLoading = false;
    $scope.isEditingActive = false;
    $scope.selectedDownloadedDataset = null;

    function activate() {
      loadDatasetList();
    }

    function loadDatasetList() {
      DatasetFactory.getDatasetList().then(function(resp) {
        $scope.datasetsList = resp;
      });
    }

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
        $scope.selectedDownloadedDataset = null;
        $scope.showActionToast();
        $scope.isDatasetLoading = false;
        $scope.isEditingActive = false;
        loadDatasetList();
      })
    };

    $scope.cancelEdit = function() {
      $scope.isDatasetLoading = false;
      $scope.isEditingActive = false;
      $scope.dataset = {};
      $scope.selectedDownloadedDataset = null;
    };

    $scope.openDataset = function() {
      DatasetFactory.getDatasetById($scope.selectedDownloadedDataset)
        .then(function(dataset) {
        $scope.dataset = dataset.result;
        $scope.isDatasetLoading = false;
        $scope.isEditingActive = true;
      })
    };

    $scope.showActionToast = function() {
      var toast = $mdToast.simple()
        .textContent('Набір даних збережено')
        .action('OK')
        .highlightAction(false);
      $mdToast.show(toast).then(function(response) {
        if(response == 'ok') {
          //'OK' clicked action
        }
      });
    };

    activate();
  }
]);