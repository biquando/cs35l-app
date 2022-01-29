const config = require("../config");
const { Group } = require("../models/group.model");

module.exports.groupMemberMiddleware = function (options = {}) {
  return async function (req, res, next) {
    try {
      // Make sure to get the user_id from the token first (authMiddleware)
      const { user_id } = req.payload;

      const group = await Group.findById(req.params.group_id);
      if (!group)
        res.status(400).json({
          error: "Couldn't find this group. Make sure you have the right group_id."
        })
      if (group.user_ids.indexOf(user_id) === -1)
        throw new Error();
      
      req.payload = group;
      next();
    } catch (error) {
      res.status(403).json({
        error: "The current user must be a member of this group to make this request."
      });
    }
  };
};

module.exports.groupOwnerMiddleware = function (options = {}) {
  return async function (req, res, next) {
    try {
      // Make sure to get the user_id from the token first (authMiddleware)
      const { user_id } = req.payload;

      const group = await Group.findById(req.params.group_id);
      if (!group)
        res.status(400).json({
          error: "Couldn't find this group. Make sure you have the right group_id."
        })
      if (group.owner_id !== user_id)
        throw new Error();

      req.payload = group;
      next();
    } catch (error) {
      res.status(403).json({
        error: "The current user must be the owner of this group to make this request."
      });
    }
  }
}
