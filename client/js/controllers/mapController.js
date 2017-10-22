class MapController {
  constructor (Polygon, Dataset, $scope) {
    this.$scope = $scope;
    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      center: {
        lat: 46.1147226,
        lng: 29.9567193
      },
      zoom: 7
    });
    this.Polygon = Polygon;
    this.Dataset = Dataset;
    this.Polygon.drawAllDistricts(this.map)
            .then(counties => {
              this.counties = counties;
            });

    this.displayDataset();
    this.markers = [];
  }

  loadPolygon () {
    this.Polygon.getCountyPolygon(this.county)
            .then(polygon => {
              this.Polygon.drawPolygon(polygon, this.map);
            });
  }

  displayDataset () {
    this.$scope.$on('getDataset', (ev, dataset) => {
      this.clearMarkers();
      this.Dataset.displayDataset(dataset, this.markers, this.map);
      this.currentDataset = dataset;
      // $scope.colors = [
      //   {
      //     minValue: 0,
      //     maxValue:0,
      //     color: '#C3E1FF'
      //   },
      //   {
      //     minValue: 0,
      //     maxValue:1,
      //     color: '#FF8AF4'
      //   },
      //   {
      //     minValue:1,
      //     maxValue:10,
      //     color: '#6501AB'
      //   },
      //   {
      //     minValue: 10,
      //     maxValue:50,
      //     color: '#010BAB'
      //   },
      //   {
      //     minValue: 50,
      //     maxValue:100,
      //     color: '#001AFF'
      //   },
      //   {
      //     minValue: 100,
      //     maxValue:200,
      //     color: '#30B8FF'
      //   },
      //   {
      //     minValue: 200,
      //     maxValue:400,
      //     color: '#5CFFE4'
      //   },
      //   {
      //     minValue: 400,
      //     maxValue:800,
      //     color: '#1FB951'
      //   },
      //   {
      //     minValue: 800,
      //     maxValue:1600,
      //     color: '#2EFF00'
      //   },
      //   {
      //     minValue: 1600,
      //     maxValue:3200,
      //     color: '#F6FF00'
      //   },
      //   {
      //     minValue: 3200,
      //     maxValue:6400,
      //     color: '#FFCD00'
      //   },
      //   {
      //     minValue: 6400,
      //     maxValue:12800,
      //     color: '#FF9E00'
      //   },
      //   {
      //     minValue: 12800,
      //     maxValue:25600,
      //     color: '#FF7800'
      //   },
      //   {
      //     minValue: 25600,
      //     maxValue:51200,
      //     color: '#FF3400'
      //   },
      //   {
      //     minValue: 51200,
      //     maxValue:Infinity,
      //     color: '#FF0000'
      //   }
      // ]
      //
      //
      // $scope.getPolygon = function () {
      //   $scope.reset();
      //   console.log($scope.district);
      //   var regionNeeded = $scope.polygons.find(function(region) {
      //     console.log(region.id.indexOf($scope.district.name) !== -1);
      //     return region.id.indexOf($scope.district.name) !== -1;
      //   });
      //   if(regionNeeded) {
      //     var area = regionNeeded.control.getPlurals().get(regionNeeded.id).model;
      //     area.fill.color = '#ff0000';
      //   }
      //   //$http.post('/regions', $scope.district)
      //   //  .then(function(response) {
      //   //      $scope.polygonCoords = response.data;
      //   //  })
      // };
      //
      // $scope.highlightRegions = function() {
      //   $scope.polygons.forEach(function (polygon) {
      //     polygon.totalValue = 0;
      //   });
      //
      //   if($scope.field) {
      //     $scope.showCheckbox = true;
      //     $scope.dataset.records.forEach(function (data) {
      //       localStorage.data = data;
      //       $scope.polygons.forEach(function(polygon) {
      //         if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(data.lat, data.lon),
      //             polygon.control.getPlurals().get(polygon.id).gObject))
      //           data.area = polygon.id;
      //       });
      //       var marker = {
      //         data: data
      //       };
      //       markers.push(marker);
      //     });
      //
      //     $scope.polygons.forEach(function (polygon) {
      //       polygon.markers = [];
      //       markers.forEach(function (marker) {
      //         if (marker.data.area === polygon.id)
      //           polygon.markers.push(marker);
      //       })
      //     });
      //
      //     $scope.polygons.forEach(function(polygon) {
      //       var fillColor;
      //       polygon.totalValue = 0;
      //
      //       polygon.markers.forEach(function(item) {
      //         var criteria = parseFloat(item.data[$scope.field]);
      //
      //         if(!isNaN(criteria)) {
      //           polygon.totalValue += criteria;
      //         }
      //       });
      //
      //       if (polygon.totalValue == 0)  {
      //         fillColor = "#C3E1FF";
      //       }
      //       else {
      //         $scope.colors.forEach(function(color) {
      //           if(defineRange(polygon.totalValue, color.minValue, color.maxValue))
      //             fillColor = color.color;
      //         });
      //       }
      //
      //       var area = polygon.control.getPlurals().get(polygon.id).model;
      //       area.fill.color = fillColor;
      //     });
      //   } else {
      //     alert('Оберiть показник для вiдображення статiстики');
      //   }
      // };
      //
      // $scope.setCriteria = function(field) {
      //   $scope.field = field;
      // }
      //
      // $scope.removeWrongFields = function(itm) {
      //   return itm.type == "int" || itm.type == "float";
      // }
      //
      // $scope.reset = function(map) {
      //   $scope.polygons.forEach(function(polygon) {
      //     var area = polygon.control.getPlurals().get(polygon.id).model;
      //     area.fill.color = '#C3E1FF';
      //   });
      //   $scope.showCheckbox = false;
      //   $scope.map.markers = [];
      // }
      //
      // function defineRange(value, min, max) {
      //   return value > min && value <= max;
      // }
    });
  }

  clearMarkers () {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
  }
}

export default MapController;
