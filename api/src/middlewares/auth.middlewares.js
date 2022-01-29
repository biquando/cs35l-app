const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports.authMiddleware = function (options = {}) {
  return async function (req, res, next) {
    try {
      // authorization: "Bearer <token>"
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      req.payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
      next();
    } catch (error) {
      res.status(401).json({
        error: `Hey front end dev, it's Omer. This is an endpoint that needs the user to be logged in. You need a request header with the property 'authorization' and value 'Bearer <non-expired token>. Feel free to send a discord message to get this fixed.'`,
      });
    }
  };
};
