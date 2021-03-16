const jwt = require("jsonwebtoken");

function userRoutes(router, setPath) {

  router.get(setPath+'/users/find', function(req, res){
    var data = { email: req.query.email, password: req.query.password}
    users.getUser(data, function(err, myusers){
      if(err){
        throw err;
      }else if(myusers){
        jwt.sign({ user: data }, "secretkey", (err, token) => {
          kycs.getKycById(myusers._id, function(err, mykycs){
            if(err){
              throw err;
            }
            res.json({token: token, user: myusers, kyc: mykycs});
          });
        });
      }else{
        res.json({token: null, user: null, kyc: null, status: 'Credential Not Found'})
      }
    });
  });

  router.get(setPath+'/users', function(req, res){
    var data = { email: req.query.email}
    users.getUserByEmail(req.query.email, function(err, user){
      if(err){
        throw err;
      }else if(user){
        jwt.sign({ user: data }, "secretkey", (err, token) => {
          kycs.getKycById(user._id, function(err, mykycs){
            if(err){
              throw err;
            }
            res.json({token: token, user: user, kyc: mykycs});
          });
        });
      }else{
        res.json({token: null, user: null, kyc: null, status: 'Credential Not Found'})
      }
    });
  });

  router.post(setPath + "/users", function(req, res) {
    var newUser = req.body;
    users.createUser(newUser, function(err, newusers) {
      if (err) {
        throw err;
      }
      jwt.sign({ user: newUser }, "secretkey", (err, token) => {
        res.json({
          token: token,
          user: newusers
        });
      });
    });
  });

  router.put(setPath+'/users/:_id', function(req, res){
    var id = req.params._id;
    var editUser = req.body;
    users.updateUser(id, editUser, {}, function(err, myuser){
      if(err){
        throw err;
      }
      res.json(myuser);
    });
  });

  // route to delete my questions
  router.delete(setPath+'/users/:_id', function(req, res){
    var id = req.params._id;
    users.deleteUser(id, function(err, myuser){
      if(err){
        throw err;
      }
      res.json(myuser);
    });
  });
}

module.exports.userRoutes = userRoutes;
