'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  // install middleware
  swaggerExpress.register(app);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(port);
console.log('Server is listening on port 3000');
