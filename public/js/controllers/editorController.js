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
      {value: 'bar',  name: 'Bar chart'}
    ];
    $scope.geoTypes = [
      {value: 'lat',    name: 'Latitude'},
      {value: 'lon',    name: 'Longitude'},
      {value: 'region', name: 'Region'}
    ];
    $scope.dataset = {};
    $scope.datasetOrIdentifier = '';
    $scope.isDatasetLoading = false;
    $scope.isEditingActive = false;
    $scope.selectedDownloadedDataset = null;
    $scope.fieldsIdentifiers = [];

    function activate() {
      loadDatasetList();
    }

    function loadDatasetList() {
      DatasetFactory.getDatasetList().then(function(resp) {
        $scope.datasetsList = resp;
      });
    }

    $scope.loadDataset = function (url) {
      var matched = url.match(/data\.ngorg\.od\.ua\/uk\/api\/action\/datastore\/search\.json\?resource_id=/);
      $scope.isInvalidUrl = false;
      if(matched) {
        $scope.isDatasetLoading = true;
        DatasetFactory.loadDatasetFromUrl(url).then(function(resp) {
          DatasetFactory.getDatasetList().then(function(datasetList) {
            $scope.datasetsList = datasetList;
            $scope.isDatasetLoading = false;
            $scope.isEditingActive = true;
            $scope.dataset = resp.result;
            $scope.dataset.fields.forEach(function(field) {
              $scope.fieldsIdentifiers.push(field.id);
            });
          });
        });
      } else {
        $scope.isInvalidUrl = true;
      }
    };

    $scope.save = function() {
      $scope.dataset.fields.forEach(function(field, index) {
        if(field.id !== $scope.fieldsIdentifiers[index]) {
          $scope.dataset.records.forEach(function(record) {
            var fieldData = record[$scope.fieldsIdentifiers[index]];
            delete record[$scope.fieldsIdentifiers[index]];
            record[field.id] = fieldData;
          });
        }
      });
      DatasetFactory.updateDataset($scope.dataset).then(function() {
        $scope.selectedDownloadedDataset = null;
        $scope.showActionToast();
        $scope.isDatasetLoading = false;
        $scope.isEditingActive = false;
        $scope.fieldsIdentifiers = [];
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
        $scope.fieldsIdentifiers = [];
        $scope.dataset.fields.forEach(function(field) {
          $scope.fieldsIdentifiers.push(field.id);
        });
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