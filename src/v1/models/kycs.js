var mongoose = require("mongoose");

// MyClass Schema
var myKycSchema = mongoose.Schema(
  {
    phone_number: {
      type: String,
      default: null
    },
    street: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    zip_code: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    user_id: {
      type: String,
      required: true
    }
  },
  { collection: "kyc" }
);

var Kyc = (module.exports = mongoose.model("kyc", myKycSchema));

// Get Kyc
module.exports.getkycs = function(callback, limit) {
    Kyc.find(callback).limit(limit);
};

// Create Kyc
module.exports.createKyc = function(newKyc, callback) {
  Kyc.create(newKyc, callback);
};

// Show/Edit Kyc
module.exports.getKycById = function(id, callback) {
  console.log('user details', id)
  Kyc.findOne({user_id: id}, callback);
};

// Update Kyc
module.exports.updateKyc = function(id, editKyc, options, callback){
    var query = {_id: id};
	var update = {}
	Kyc.findOneAndUpdate(query, update, options, callback);
}

// Delete Kyc
module.exports.deleteKyc = function(id, callback){
	var query = {_id: id};
	Kyc.remove(query, callback);
}