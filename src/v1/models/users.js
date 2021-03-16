var mongoose = require("mongoose");

// MyClass Schema
var myUserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    password: {
      type: String,
      default: null
    }
  },
  { collection: "user" }
);

var User = (module.exports = mongoose.model("user", myUserSchema));


module.exports.getUserByEmail = function(data, callback) {
  User.findOne({email: data}, callback);
};

// Create User
module.exports.createUser = function(newUser, callback) {
  User.create(newUser, callback);
};

// Show/Edit User
module.exports.getUser = function(data, callback) {
  User.findOne({email: data.email, password: data.password}, callback);
};

// Update User
module.exports.updateUser = function(id, editAnswer, options, callback){
    var query = {_id: id};
	var update = {}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.deleteUser = function(id, callback){
	var query = {_id: id};
	User.remove(query, callback);
}