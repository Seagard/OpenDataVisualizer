angular.module('main').controller 'DataController', (DatasetFactory, FilterFactory) ->
  vm = @
  activate = () ->
    DatasetFactory.getUnitedDataset (data) ->
      vm.dataset = data
      console.log 'got data'
      console.log data
    FilterFactory.registerOnFilterChangedEvent (data) ->
      vm.dataset = data
      console.log 'got event'
      console.log @dataset
  activate()