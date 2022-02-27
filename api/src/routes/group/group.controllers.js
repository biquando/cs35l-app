const { Group } = require("../../models/group.model");
const { User } = require("../../models/user.model");

module.exports.createGroup = async function (req, res) {
  try {
    const { user_id } = req.payload;
    const { name, description } = req.body;

    const group = await Group.create({
      name,
      owner_id: user_id,
      description,
      user_ids: [user_id],
    });

    const user = await User.findById(user_id);
    const newGroupIds = user.group_ids.concat([group._id]);
    await User.findByIdAndUpdate(user_id, {
      group_ids: newGroupIds,
    });

    res.json({ data: group });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.queryGroup = async function (req, res) {
  try {
    let searchObject = {};
    try {
      const queryString = decodeURIComponent(req.query.query);
      searchObject = JSON.parse(queryString);
    } catch (error) {}

    const groups = await Group.find(searchObject);
    res.json({ data: groups });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.getGroup = async function (req, res) {
  try {
    const { group } = req.payload;
    res.json({ data: group });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.deleteGroup = async function (req, res) {
  try {
    const group = await Group.findById(req.params.group_id);
    const memberIds = group.user_ids;
    await Group.findByIdAndDelete(req.params.group_id);

    // Remove group_id from each member
    memberIds.forEach(async user_id => {
      const user = await User.findById(user_id);
      const newGroupIds = user.group_ids.filter(
        gid => gid != req.params.group_id
      );
      await User.findByIdAndUpdate(user_id, {
        group_ids: newGroupIds,
      });
    });
    res.status(200).end();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.updateGroup = async function (req, res) {
  try {
    const { data } = req.body;
    if (!data)
      throw new Error("You need to send a 'data' object with the new values.");

    delete data._id;
    const newGroup = await Group.findByIdAndUpdate(req.params.group_id, data, {
      new: true,
    });
    res.json({
      data: newGroup,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.joinGroup = async function (req, res) {
  try {
    const { user_id } = req.payload;
    const group = await Group.findById(req.params.group_id);
    if (!group) throw new Error("There is no group with this id.");
    if (group.user_ids.indexOf(user_id) !== -1)
      throw new Error("User is already in this group!");

    (newUserIds = group.user_ids.concat([user_id])),
      await Group.findByIdAndUpdate(req.params.group_id, {
        user_ids: newUserIds,
      });

    const user = await User.findById(user_id);
    const newGroupIds = user.group_ids.concat([group._id]);
    await User.findByIdAndUpdate(user_id, {
      group_ids: newGroupIds,
    });

    res.status(200).end();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.leaveGroup = async function (req, res) {
  try {
    const { user_id, group } = req.payload;
    if (user_id == group.owner_id)
      throw new Error("User cannot leave group because they are the owner.");

    const newUserIds = group.user_ids.filter(item => item != user_id);
    await Group.findByIdAndUpdate(req.params.group_id, {
      user_ids: newUserIds,
    });

    // Remove group_id from each member
    const user = await User.findById(user_id);
    const newGroupIds = user.group_ids.filter(
      gid => gid != req.params.group_id
    );
    await User.findByIdAndUpdate(user_id, {
      group_ids: newGroupIds,
    });

    res.status(200).end();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};
