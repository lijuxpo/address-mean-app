var express = require('express');
var Requests = require('../models/requests');
var Address = require('../models/address');

var router = express.Router();

// get list with addresid
router.get('/list/:search', function (req, res) {
  var search = Number(req.params.search);

  Requests.aggregate([
    { $match: { AID: search } },
    {
      $lookup: {
        from: "address",
        localField: "AID",
        foreignField: "AID",
        as: "address"
      }
    },
    {
      $lookup: {
        from: "piano",
        localField: "PID",
        foreignField: "PID",
        as: "pianos"
      }
    },
  ]).exec(function (err, datas) {
    if (err) {
      res.send('error has occured');
    } else {
      // console.log(datas);
      res.json(datas[0]);
    }
  });

  /* Requests.find({ "AID": search }).exec(function (err, books) {
    if (err) {
      res.send('error has occured');
    } else {
      console.log(books);
      res.json(books);
    }
  }); */
});

module.exports = router;
