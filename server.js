'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var fs = require('fs');
var app = express();
module.exports = app; // for testing

var contents = fs.readFileSync('data/regions.json');

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

app.get('/json', function(req, res) {    
    res.send(JSON.parse(contents));
});


app.listen(port);
console.log('Server is listening on port 3000');


//test
//var analyse = require('./analyse/analyse.js');
//var datasetsUrls = [
//    {
//        host: 'data.ngorg.od.ua',
//        path: '/api/action/datastore/search.json?resource_id=437b67c2-269f-41ee-973e-dd91a741c1fd'
//    },
//    {
//        host: 'data.ngorg.od.ua',
//        path: '/api/action/datastore/search.json?resource_id=8d316559-72a9-477d-bb06-197047607c1f'
//    },
//    {
//        host: 'data.ngorg.od.ua',
//        path: '/api/action/datastore/search.json?resource_id=5f25e8b1-6a8d-47ce-9fee-6d39a13d9db8'
//    }
//]
//
//datasetsUrls.forEach(function(url, i) {
//    analyse.loadData(url.host, url.path)
//        .then(function(data) {
//            console.log('Got data:');
//            console.log(data);
//            var obj = JSON.parse(data).result;
//            obj.type = 'expence';
//            fs.writeFile('data/dataset' + i +'.json', JSON.stringify(obj));
//        }, function(err) {
//            console.log('Error loading datasets');
//            console.log(err);
//        })
//        .catch(function(err) {
//            console.log(err);
//        })
//});