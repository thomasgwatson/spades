var config = require('./config');
var express = require('express');
var pg = require('pg.js');
var fs = require('fs');
// var bodyParser = require('body-parser');

var routes = require('./routes');

var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 20000;
https.globalAgent.maxSockets = 20000;

var path = require('path');

var app = express();

var IS_DEV = app.get('env') === 'development';

app.disable('x-powered-by');
// app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

var errorHandler = function(err, req, res, next) {
  console.error(err);
  res.status(500);
  res.render('500');
};

app.use(errorHandler);

if(config.http.sslonly != null) {
  console.log('Redirecting HTTP --> HTTPS');
  app.all('*', ensureSecure);
}

app.get('/', routes.base);
app.all('/api/*', routes.api);

app.all('*', function(err, req, res, next){
  res.redirect('/')
});

process.on('uncaughtException', function(err) {
  console.log('Exception: ' + err);
  console.log(error.stack);
});

http.createServer(app).listen(config.http.port, function() {
  console.log('Server launched and listening on port ' + config.http.port);
});