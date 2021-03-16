var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// require file path
var filePath = require('../../config/initializers');

// mongoose connect
mongoose.connect(filePath.db_staging);

// api version
var currentVersion = filePath.currentVersionNumber;
var setPath = '/api/'+currentVersion // example '/v1'

// Require all the necessary models here

users = require('../'+currentVersion+'/models/users');
kycs = require('../'+currentVersion+'/models/kycs');
transaction = require('../'+currentVersion+'/models/transaction');

//------------begin-----include all the necessary routes here----------------------
// include user routes
var usersFile = require('../'+currentVersion+'/routes/users');
usersFile.userRoutes(router,setPath);

// include kyc routes
var kycFile = require('../'+currentVersion+'/routes/kycs');
kycFile.kycRoutes(router,setPath);

// include buy crypto routes
var transactionFile = require('../'+currentVersion+'/routes/transaction');
transactionFile.transactionRoutes(router,setPath);


//------------end------------------------------------------------

// Default Route
router.get('/', function(req, res, next) {
  //res.send('Hi Please use /v1/myClasses');
  res.render('index', { condition: false });
});

router.get('/api', function(req, res, next) {
  res.send('In valid Request');
});

router.get('/api/v1', function(req, res, next) {
  res.send('In valid Request');
});

module.exports = router;
