class DataController
  constructor: (DatasetFactory, FilterFactory) ->
    DatasetFactory.getUnitedDataset (data) =>
      @dataset = data
      console.log 'got data'
      console.log data
    FilterFactory.registerOnFilterChangedEvent (data) =>
      @dataset = data
      console.log 'got event'
      console.log @dataset

angular.module('main').controller 'DataController', DataController