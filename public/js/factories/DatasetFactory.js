angular.module('main').factory('DatasetFactory', function($http) {

    var allDatasets;
    var unitedDatasets;

    var datasetLoadedCallbacks = [];

    function registerOnDatasetLoadedEvent(callback) {
        if(datasetLoadedCallbacks.indexOf(callback) == -1) {
            datasetLoadedCallbacks.push(callback);
        }
    }

    function notifyDatasetLoaded(dataset) {
        datasetLoadedCallbacks.forEach(function(callback) {
            callback(dataset);
        })
    }

    function getAllDatasets(callback) {
        $http({
            type: 'GET',
            url: '/api/dataset/all'
        }).then(function(resp) {
            if(!allDatasets || !angular.equals(unitedDatasets, resp.data)) {
                allDatasets = resp.data;
            }
            if(callback) {
                callback(allDatasets);
            }
        }, function(err) {
            console.log('Error: ');
            console.log(err);
        });
    }

    function getUnitedDataset(callback) {
        $http({
            type: 'GET',
            url: '/api/dataset/united'
        }).then(function(resp) {
            if(!unitedDatasets || !angular.equals(unitedDatasets, resp.data)) {
                unitedDatasets = resp.data;
                console.log('Updated datasets');
            }
            if(callback) {
                callback(unitedDatasets);
            }
        }, function(err) {
            console.log('Error: ');
            console.log(err);
        });
    }

    function getDatasetById(datasetId) {
        console.log('Loading dataset: ', datasetId);
        $http.get('/api/dataset/' + datasetId).then(function(resp) {
            notifyDatasetLoaded(resp.data);
        }).catch(function(err) {
            console.log(err);
        })
    }

    return {
        registerOnDatasetLoadedEvent: registerOnDatasetLoadedEvent,
        getAllDatasets: getAllDatasets,
        getUnitedDataset: getUnitedDataset,
        getDatasetById: getDatasetById
    }
});