var config = require('../config');
var fs = require('fs');
var entry = require('../models/entry.js')

exports.api = function(req, res) {
  entry.getEntries(function(err, entries){
    if(err) {
        res.status(500).json({message: "Error with databasecall", err: err});
      } else {
        res.status(200).json(entries)
      }
  })
};

exports.base = function(req, res) {
  var backingImages = fs.readdirSync("public/images/backing")
  console.log(backingImages)


  res.render('portal', {
    'useJsx': config.useJsx,
    'backingImages': backingImages
  });
};