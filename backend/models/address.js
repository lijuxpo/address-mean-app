var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
  AID: {
    type: Number,
    unique: true,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Suburb: {
    type: String,
    required: true
  },
  Postcode: {
    type: Number,
    unique: true,
    required: true
  }
});
var collectionName = 'address';
module.exports = mongoose.model('Address', addressSchema, collectionName);