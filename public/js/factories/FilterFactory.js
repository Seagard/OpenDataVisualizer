angular.module('main').factory('FilterFactory', function(DatasetFactory) {
    var filterItems;

    var filterChangedCEventCallbacks = [];

    function activate() {
        DatasetFactory.getUnitedDataset(function(data) {
            filterItems = data.fields;
        });
    }

    function registerOnFilterChangedEvent(callback) {
        if(filterChangedCEventCallbacks.indexOf(callback) == -1) {
            filterChangedCEventCallbacks.push(callback);
            callback(filterItems);
        }
    }

    function notifyFilterChangedEvent(fields) {
        filterItems = fields;
        filterChangedCEventCallbacks.forEach(function (callback) {
            callback(fields);
        });
    }

    function getFilteredItems() {
        return filterItems;
    }

    activate();

    return {
        registerOnFilterChangedEvent: registerOnFilterChangedEvent,
        notifyFilterChangedEvent: notifyFilterChangedEvent,
        getFilteredItems: getFilteredItems
    }
});