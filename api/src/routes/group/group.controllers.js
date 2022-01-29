const { Group } = require("../../models/group.model");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports.createGroup = async function (req, res) {
  try {
    const { user_id } = req.payload;
    const { name, description } = req.body;

    const group =  await Group.create({
      name,
      owner_id: user_id,
      description,
      user_ids: [user_id],
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
    const { name, description, id } = req.query;
    var searchObject = {};
    Object.assign(searchObject, name        && {name},
                                description && {description},
                                id          && {_id: id});

    groups = await Group.find(searchObject);
    res.json({ data: groups })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.getGroup = async function (req, res) {
  try {
    const group = req.payload;
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
    await Group.findByIdAndDelete(req.params.group_id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};
