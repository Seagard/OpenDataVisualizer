class FilterController
  @fields = []
  @filteredDataset = {}
  @filteredDataset.fields = []
  @filteredDataset.records = []
  @FilterFactory

  constructor: (DatasetFactory, FilterFactory) ->
    @FilterFactory = FilterFactory
    DatasetFactory.getUnitedDataset (data) =>
      @dataset = data
      console.log 'got datasets'
      console.log @dataset
      datasetsLoaded()

  datasetsLoaded = =>
    for datasetField in @dataset.fields
      filterField = {}
      filterField.id = datasetField.id
      if datasetField.type is 'text'
        filterField.type = 'select'
        filterField.selectedVal = -1
        filterField.values = []
        values = []
        for record in @dataset.records
          if _.contains values, record[datasetField].id
            values.push record[datasetField].id
        for value, i in values
          filterField.values.push id: i, name: value
      if datasetField.type is 'int'
        filterField.type = 'range'
        filterField.minVal = 0
        filterField.maxVal = 0
        filterField.values = []
        for record in @dataset.records
          value = parseInt record[filterField.id]
          filterField.minVal = value if value < filterField.minVal
          filterField.maxVal = value if value > filterField.maxVal
          filterField.selectedVal = filterField.maxVal
      @fields.push filterField
      @filteredDataset.fields.push @fields

  @applyFilter = =>
    @filteredDataset.records = []
    for record in @dataset.records
      recordFlags = (false for field in fields)
      for field, i in @fields
        if field.type is 'select'
          if field.selectedVal == -1
            recordFlags[i] = true
          else
            code = record[field].id
            value = field.values[field.selectedVal].name
            recordFlags[i] = true if code is value
        if field.type is 'range'
          recordFlags[i] = true if parseInt record[field].id <= field.selectedVal
    @filteredDataset.records.push record if _.contains recordFlags, false
  @FilterFactory.notifyFilterChangedEvent @filteredDataset

angular.module('main').controller 'FilterController', FilterController