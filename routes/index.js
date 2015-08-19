var config = require('../config');
var fs = require('fs');


exports.api = function(req, res) {
  // something something api
};

exports.base = function(req, res) {
  var backingImages = fs.readdirSync("public/images/backing")
  console.log(backingImages)


  res.render('portal', {
    'useJsx': config.useJsx,
    'backingImages': backingImages
  });
};