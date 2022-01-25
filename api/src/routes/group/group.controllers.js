const { Group } = require("../../models/group.model");
const jwt = require("jsonwebtoken");
const config = require("../../config");

function verifyBearerToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Missing token")
    }
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    return { success: true, payload };
  } catch (error) {
    return { success: false, error };
  }
}

module.exports.createGroup = async function (req, res) {
  try {
    const tokenVerification = verifyBearerToken(req);
    if (!tokenVerification.success)
      throw new Error(tokenVerification.error.message);
    const { user_id } = tokenVerification.payload;
    
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

module.exports.getGroup = async function (req, res) {
  try {
    const tokenVerification = verifyBearerToken(req);
    if (!tokenVerification.success)
      throw new Error(tokenVerification.error.message);
    const { user_id } = tokenVerification.payload;

    const group = await Group.findById(req.params.group_id);
    if (!group)
      throw new Error("Invalid group");
    if (group.user_ids.indexOf(user_id) === -1)
      throw new Error("User is not part of group")
    
    res.json({ data: group });

  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
}

module.exports.deleteGroup = async function (req, res) {
  try {
    const tokenVerification = verifyBearerToken(req);
    if (!tokenVerification.success)
      throw new Error(tokenVerification.error.message);
    const { user_id } = tokenVerification.payload;

    const group = await Group.findById(req.params.group_id);
    if (!group)
      throw new Error("Invalid group");
    if (group.owner_id !== user_id)
      throw new Error("User is not owner of group");

    await Group.findByIdAndDelete(req.params.group_id);
    res.status(200).end();

  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};
