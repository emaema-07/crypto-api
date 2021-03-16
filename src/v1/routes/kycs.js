const jwt = require("jsonwebtoken");
function kycRoutes(router, setPath) {
    /* GET kycs listing. */
    router.get(setPath + "/kycs", function(req, res) {
      kycs.getkycs(function(err, mykycs) {
        if (err) {
          throw err;
        }
        res.json(mykycs);
      });
    });

    // route to get kyc by id
    router.get(setPath+'/kycs/:_id', function(req, res){
      kycs.getKycById(req.params._id, function(err, mykycs){
        if(err){
          throw err;
        }
        res.json(mykycs);
      });
    });
  
    // route to create kyc
    router.post(setPath + "/kycs", verifyToken, function(req, res) {
      var newKyc = req.body;
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          kycs.createKyc(newKyc, function(err, newkycs) {
          if (err) {
            throw err;
          }
         res.json({
            message: "Success",
            data: newkycs
          });
       });
        }
      })
    });

    // route to update kyc
    router.put(setPath+'/kycs/:_id', function(req, res){
      var id = req.params._id;
      var editKyc = req.body;
      kycs.updateKyc(id, editKyc, {}, function(err, mykyc){
        if(err){
          throw err;
        }
        res.json(mykyc);
      });
    });
  
    // route to delete kyc
    router.delete(setPath+'/kycs/:_id', function(req, res){
      var id = req.params._id;
      kycs.deleteKyc(id, function(err, mykyc){
        if(err){
          throw err;
        }
        res.json(mykyc);
      });
    });
  }
  
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

  module.exports.kycRoutes = kycRoutes;
  