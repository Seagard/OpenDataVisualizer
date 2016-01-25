'use strict';

/**
 *  Node modules
 * */
var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

/**
 *  API
 * */
require('./api/dataset')(app);

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


var port = 3000;
if (process.env.NODE_ENV === "production") {
  port = 80;
}

app.listen(port, function() {
    console.log('Server is listening on port 3000...');
});