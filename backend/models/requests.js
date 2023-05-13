var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  CID: {
    type: Number,
    unique: true,
    required: true
  },
  UID: {
    type: Number,
    unique: true,
    required: true
  },
  AID: {
    type: Number,
    unique: true,
    required: true
  },
  PID: {
    type: Number,
    unique: true,
    required: true
  },
  SN: {
    type: Number,
    unique: true,
    required: true
  },
  Sales: {
    type: Number,
    unique: true,
    required: true
  },
  Sold_Date: {
    type: String,
    required: true
  },
  Active: {
    type: String,
    required: true
  },
  Directly_Sold: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Requests', requestSchema);