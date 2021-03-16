const jwt = require("jsonwebtoken");
function transactionRoutes(router, setPath) {
  
    router.post(setPath + "/transaction", verifyToken, function(req, res) {
      var newData = req.body;
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          transaction.createTransaction(newData, function(err, newDatas) {
          if (err) {
            throw err;
          }
         res.json({
            message: "Success",
            data: newDatas
          });
       });
        }
      })
    });

    router.get(setPath + "/trade-history", verifyToken, function(req, res) {
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          transaction.getTrade(req.query.id, function(err, trades) {
            console.log('trades trades', trades);
          if (err) {
            throw err;
          }
         res.json(trades);
       });
        }
      })
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

  module.exports.transactionRoutes = transactionRoutes;
  