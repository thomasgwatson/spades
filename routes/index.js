var config = require('../config');

exports.api = function(req, res) {
  // something something api
};

exports.order = function(req, res) {
  res.render('portal', {
    'useJsx': config.useJsx
  });
};