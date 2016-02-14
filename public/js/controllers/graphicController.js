angular.module('main').controller('GraphicController', function(DatasetFactory, FilterFactory, $scope) {
    var vm = this;

    DatasetFactory.getAllDatasets(function(data) {
        console.log(vm.datasets);
        vm.datasets = [];
        data.forEach(function(item) {
            vm.datasets.push(JSON.parse(item).result);
        });
        initializeGraphic(vm.datasets);
    });

    function initializeGraphic(datasets) {
        $scope.labels = [];
        $scope.data = [[], []];
        $scope.series = ['Викиди', '123'];
        datasets[0].records.forEach(function(record) {
            $scope.labels.push(record[datasets[0].fields[1].id]);
            $scope.data[0].push(parseFloat(record[datasets[0].fields[4].id]));
        });
        //datasets[1].records.forEach(function(record) {
        //    $scope.labels.push(record[datasets[1].fields[1].id]);
        //    $scope.data[1].push(parseFloat(record[datasets[1].fields[4].id]));
        //});
    }

    //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    //$scope.series = ['Series A', 'Series B'];
    //$scope.data = [
    //    [65, 59, 80, 81, 56, 55, 40],
    //    [28, 48, 40, 19, 86, 27, 90]
    //];
    //$scope.onClick = function (points, evt) {
    //    console.log(points, evt);
    //};


    //$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    //$scope.series = ['Series A', 'Series B'];
    //
    //$scope.data = [
    //    [65, 59, 80, 81, 56, 55, 40],
    //    [28, 48, 40, 19, 86, 27, 90]
    //];

});