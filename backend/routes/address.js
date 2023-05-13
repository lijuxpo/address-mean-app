var express = require('express');
var Requests = require('../models/requests');
var Address = require('../models/address');

var router = express.Router();

router.post("/address", (req, res) => {
  var newAddress = new Address({
    AID: req.body.AID,
    Address: req.body.Address,
    Suburb: req.body.Suburb,
    Postcode: req.body.Postcode
  });
  //add to db
  Address.create(newAddress, (err, address) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(`inserted ${newAddress} to the database todo`);
      res.json(address);
    }
  });
});

router.post("/address/edit", (req, res) => {
  const filter = { AID: req.body.AID };
  const update = {
    Address: req.body.Address,
    Suburb: req.body.Suburb,
    Postcode: req.body.Postcode
  };
  Address.findOneAndUpdate(filter, update, {
    new: true
  }).exec(function (err, data) {
    if (err) {
      res.send('error has occured');
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

router.get("/address/delete/:id", (req, res) => {
  var addressId = req.params.id;//get the id from the api
  console.log(req.params.id);
  Address.deleteOne({ _id: addressId }, (err, result) => {
    if (err) {
      console.log(`Error is deleting the task ${addressId}`);
    }
    else {
      console.log("Address successfully deleted from database");
      res.json(result);
    }
  });
});

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

// get by id
router.get('/postcode/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);

  Address.find({ _id: id }).exec(function (err, data) {
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

