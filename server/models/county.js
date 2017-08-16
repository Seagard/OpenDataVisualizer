const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/opendata');

const countySchema = mongoose.Schema({
  name: String,
  osm_id: Number,
  coords: [{}]
});

const County = mongoose.model('County', countySchema);

module.exports = County;
