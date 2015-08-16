var config = require('./config');
var express = require('express');
var pg = require('pg.js');
var fs = require('fs');

var routes = require('./routes');

var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 20000;
https.globalAgent.maxSockets = 20000;

var path = require('path');

var app = express();

var IS_DEV = app.get('env') === 'development';

app.disable('x-powered-by');
app.use(express.bodyParser());
app.use(express.methodOverride());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500);
    res.send("ERROR");
};

if(config.http.sslonly != null) {
  console.log('Redirecting HTTP --> HTTPS');
  app.all('*', ensureSecure);
}

app.get('/', routes.base);
app.all('/api/*', routes.api);

app.use(function(req, res, next) {
  res.redirect('/');
});

process.on('uncaughtException', function(err) {
  console.log('Exception: ' + err);
  console.log(error.stack);
});

http.createServer(app).listen(config.http.port, function() {
  console.log('Server launched and listening on port ' + config.http.port);
});