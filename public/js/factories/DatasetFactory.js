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

    function getExampleDatasets() {
        var result = {
            type: 'compare',
            title: 'Залишки ліків',
            datasets: []
        };
        exampleDatasets.forEach(function(dataset) {
            var resultDataset = {
                
            }
        });
        return result;
    }

    var exampleDataset1 = {"help":"Search a datastore table. :param resource_id: id or alias of the data that is going to be selected.","success":true,"result":{"fields":[{"id":"Nazva likuvalnoho zakladu","type":"text"},{"id":"Nazva likarskoho zasobu","type":"text"},{"id":"Odynytsia vymiru","type":"text"},{"id":"Kilkist","type":"int"}],"resource_id":["c345edfe-b855-4f1d-b8db-a246dfc2da65"],"limit":5,"total":"113","records":[{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u041f\u0430\u043f\u0430\u0432\u0435\u0440\u0456\u043d\u0430 \u0433/\u0445\u043b\u043e\u0440\u0438\u0434 20\u043c\u0433/ \u043c\u043b 2.0","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"50","feeds_flatstore_entry_id":"1","timestamp":"1456474962","feeds_entity_id":"398"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u0415\u0443\u0444\u0456\u043b\u043b\u0456\u043d 2%- 5.0","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"100","feeds_flatstore_entry_id":"2","timestamp":"1456474962","feeds_entity_id":"398"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u041a\u043e\u0440\u0434\u0456\u0430\u043c\u0456\u043d 250 \u043c\u0433/\u043c\u043b 2.0","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"110","feeds_flatstore_entry_id":"3","timestamp":"1456474962","feeds_entity_id":"398"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u041d\u043e - \u0445 - \u0448\u0430","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"115","feeds_flatstore_entry_id":"4","timestamp":"1456474962","feeds_entity_id":"398"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u0410\u0434\u0440\u0435\u043d\u0430\u043b\u0456\u043d 0,18%-1.0","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"15","feeds_flatstore_entry_id":"5","timestamp":"1456474962","feeds_entity_id":"398"}]}}
    var exampleDataset2 = {"help":"Search a datastore table. :param resource_id: id or alias of the data that is going to be selected.","success":true,"result":{"fields":[{"id":"Nazva likuvalnoho zakladu","type":"text"},{"id":"Nazva likarskoho zasobu","type":"text"},{"id":"Odynytsia vymiru","type":"text"},{"id":"Kilkist","type":"text"}],"resource_id":["85f801d9-4461-4c10-8fb1-18d3f3a9b932"],"limit":5,"total":"152","records":[{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u0434\u0440\u0435\u043d\u0430\u043b\u0438\u043d\u0430\u00a0 0,18% 1,0\u00a0 \u211610","Odynytsia vymiru":"\u0443\u043f","Kilkist":"3","feeds_flatstore_entry_id":"1","timestamp":"1456476662","feeds_entity_id":"401"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u043c\u043c\u0438\u0430\u043a \u0440-\u0440 10% 40\u043c\u043b","Odynytsia vymiru":"\u0444\u043b","Kilkist":"5","feeds_flatstore_entry_id":"2","timestamp":"1456476662","feeds_entity_id":"401"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u0441\u043a\u043e\u0440\u0431\u0438\u043d\u043e\u0432\u0430 \u043a-\u0441\u0442\u0430 5% 2\u043c\u043b \u211610","Odynytsia vymiru":"\u0443\u043f","Kilkist":"2","feeds_flatstore_entry_id":"3","timestamp":"1456476662","feeds_entity_id":"401"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u0441\u043f\u0430\u0440\u043a\u0430\u043c \u0430\u043c\u043f. 5\u043c\u043b \u211610","Odynytsia vymiru":"\u0443\u043f","Kilkist":"2","feeds_flatstore_entry_id":"4","timestamp":"1456476662","feeds_entity_id":"401"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u0442\u0440\u043e\u043f\u0438\u043d\u0430 \u0441\u0443\u043b\u044c\u0444\u0430\u0442 \u0430\u043c\u043f. 0,1% 1\u043c\u043b \u211610","Odynytsia vymiru":"\u0443\u043f","Kilkist":"19","feeds_flatstore_entry_id":"5","timestamp":"1456476662","feeds_entity_id":"401"}]}}
    var exampleDatasets = [exampleDataset1, exampleDataset2];

    return {
        getAllDatasets: getAllDatasets,
        getUnitedDataset: getUnitedDataset
    }
});