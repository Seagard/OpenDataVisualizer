angular.module('main').factory('DatasetFactory', function($http) {

    var allDatasets;
    var unitedDatasets;

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

    return {
        getAllDatasets: getAllDatasets,
        getUnitedDataset: getUnitedDataset
    }
});