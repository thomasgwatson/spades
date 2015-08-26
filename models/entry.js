var pg = require('pg.js');
var config = require('../config');
var hstore = require('pg-hstore')();
var conString = "postgres://"
  + config.pgsql.username + ":"
  + config.pgsql.password + "@"
  + config.pgsql.hostname + "/"
  + config.pgsql.dbname;

exports.getEntries = function(callback){

  var query = "SELECT response_object FROM entries WHERE prox > 8 AND created_at > to_timestamp(1427383413) order by created_at desc limit 2000"

  pg.connect(conString, function(err, client, done) {
    if (err) {
      console.error('error with connection', err);
      callback(err);
    } else {
      client.query(query, function(err, result) {
        done();

        if (err) {
          console.error('error with query', err);
          callback(err);
        } else {
          callback(null, parseHstoreToObjects(result.rows));
        }
      });
    }
  });
}

var parseHstoreToObjects = function (results){
  var objects = []
  for (var i = results.length - 1; i >= 0; i--) {
    hstore.parse(results[i].response_object, function(result) {
      objects.push(result)
    })
  };
  return objects
}