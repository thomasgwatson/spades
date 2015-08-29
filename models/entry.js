var pg = require('pg.js');
var config = require('../config');
var hstore = require('pg-hstore')();
var conString = "postgres://"
  + config.pgsql.username + ":"
  + config.pgsql.password + "@"
  + config.pgsql.hostname + "/"
  + config.pgsql.dbname;

exports.getEntries = function(queryOptions, callback){
  console.log(queryOptions)
  var query = "SELECT response_object FROM entries"
  + " WHERE prox > $1 AND created_at > to_timestamp($2) AND latitude >= $3 AND latitude <= $4 AND longitude >= $5 AND longitude <= $6 AND forbidden = $7"
  + " order by created_at desc limit $8"

   // start_lat = lat-1
   //  finish_lat = lat+1
   //  start_lng = lng-1.5
   //  finish_lng = lng+1.5
   //  sql_query = "latitude >= ? AND latitude <= ? AND longitude >= ? AND longitude <= ? AND prox >= ? AND created_at >= ? AND forbidden = ?"

  var queryInserts = [
  8,
  1207383413,
  queryOptions.lat -1,
  queryOptions.lat +1,
  queryOptions.lng-1.5,
  queryOptions.lng+1.5,
  false,
  5000
  ]
  console.log("queryInserts", queryInserts)
  if(process.env.DATABASE_URL){conString = process.env.DATABASE_URL}
  pg.connect(conString, function(err, client, done) {
    if (err) {
      console.error('error with connection', err);
      callback(err);
    } else {
      client.query(query, queryInserts, function(err, result) {
        done();

        if (err) {
          console.error('error with query', err);
          callback(err);
        } else {
          if(result){
            console.log(result.rows.length)
          }
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