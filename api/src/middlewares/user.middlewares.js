const { User } = require("../models/user.model");

// Checks that the requested user is the same as the logged in user
module.exports.userMiddleware = function (options = {}) {
  return async function (req, res, next) {
    try {
      // Make sure to get the user_id from the token first (authMiddleware)
      const loggedInUserId = req.payload.user_id;
      const loggedInUser = await User.findById(loggedInUserId);

      if (req.params.user_id != loggedInUser._id) {
        res.status(403).json({
          error: "The requested user does not match the logged-in user.",
        });
        return;
      }

      req.payload.user = loggedInUser;
      next();
    } catch (error) {
      res.status(400).json({
        error: "Couldn't find this user. Make sure you have the right user_id.",
      });
    }
  };
};
