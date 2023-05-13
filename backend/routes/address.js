var express = require('express');
var Requests = require('../models/requests');
var Address = require('../models/address');

var router = express.Router();

// get list
router.get('/postcode', function (req, res) {
  /* var search = req.params.search;
  console.log(search); */

  Address.find().exec(function (err, data) {
    if (err) {
      res.send('error has occured');
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

router.get('/address/:search', function (req, res) {
  var search = req.params.search;
  Address.find({
    $or: [
      { 'Address': { $regex: '.*' + search + '.*', $options: 'i' } },
      { 'Suburb': { $regex: '.*' + search + '.*', $options: 'i' } },
    ]
  }).exec(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

module.exports = router;

