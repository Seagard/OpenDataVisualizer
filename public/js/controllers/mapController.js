angular.module('main')
    .controller('MapController', function($http, $scope) {
    var vm = this;

    vm.map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
});

