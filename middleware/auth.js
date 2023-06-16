const jwt = require("jsonwebtoken");
const config = require("config");

//Middleware Function
function auth(req, res, next) {
  const token = req.header("x-auth-token"); //Loads token from the header
  if (!token) {
    return res.status(401).send("Access Denied! No token provided");
  }
  try {
    const decoded = jwt.verify(token, config.get("secretkey")); //Decodes the token
    req.user = decoded; //Loads the decoded token into req.user so that it can be used by the next bit of middleware or the controller
    next(); //Calls next bit of middleware
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}
module.exports = auth;