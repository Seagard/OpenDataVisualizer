angular.module('main').factory('FilterFactory', function(DatasetFactory) {
    var filterItems = [];

    var filterChangedCEventCallbacks = [];

    function registerOnFilterChangedEvent(callback) {
        if(filterChangedCEventCallbacks.indexOf(callback) == -1) {
            filterChangedCEventCallbacks.push(callback);
        }
    }

    function notifyFilterChangedEvent(fields) {
        console.log('Got event:');
        console.log(fields);
        filterChangedCEventCallbacks.forEach(function (callback) {
            callback(fields);
        });
    }

    DatasetFactory.getUnitedDataset(function(data) {
        filterItems = data.fields;
    });

    return {
        registerOnFilterChangedEvent: registerOnFilterChangedEvent,
        notifyFilterChangedEvent: notifyFilterChangedEvent
    }
});