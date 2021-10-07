const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = res.header("auth-token");

  if (!token) 
    return res.status(401).json("acess denied");
  

  try {
    const validToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.validUsers = validToken;
    next();
  } catch (error) {
    res.status(404).send(error.message);
  }
};
