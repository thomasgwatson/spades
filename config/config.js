var fs = require('fs');

var config = {};

config.loglevel = process.env.LOGLEVEL || 0;

if(fs.existsSync("public/lib/app/clientApp.jsx")) {
  config.useJsx = true;
} else {
  config.useJsx = false;
}

config.http = {};
config.http.port = process.env.PORT || 3000;
config.http.sslonly = process.env.HTTPS_ONLY || null;
config.http.sslbase = process.env.HTTPS_BASE || 'https://graffi.so';

config.pgsql ={};
config.pgsql.hostname = process.env.PGSQL_HOSTNAME || 'localhost';
config.pgsql.port = process.env.PGSQL_PORT || 5432;
config.pgsql.username = process.env.PGSQL_USERNAME || 'apprentice';
config.pgsql.password = process.env.PGSQL_PASSWORD || '';
config.pgsql.dbname = process.env.PGSQL_DBNAME || 'leche_asada_dev';


console.log("***** CONFIGS AWAY *****");
console.log(config);

module.exports = config;