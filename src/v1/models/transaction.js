var mongoose = require("mongoose");

// MyClass Schema
var myTransactionSchema = mongoose.Schema(
  {
    coin: {
      type: String,
      default: null
    },
    amount: {
      type: String,
      default: null
    },
    quantity: {
      type: String,
      default: null
    },
    date: {
      type: Date,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    user_id: {
      type: String,
      required: true
    }
  },
  { collection: "transaction" }
);

var Transaction = (module.exports = mongoose.model("transaction", myTransactionSchema));


// Create New Transaction
module.exports.createTransaction = function(newData, callback) {
  Transaction.create(newData, callback);
};

module.exports.getTrade = function(data, callback) {
  console.log('module', data)
  Transaction.find({user_id: data}, callback);
};
