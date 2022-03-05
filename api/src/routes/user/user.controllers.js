const { User } = require("../../models/user.model");

module.exports.getUser = async function (req, res) {
  try {
    const userId = req.params.user_id;
    const user = await User.findById(userId);
    if (!user) throw new Error("There is no user with this id.");
    const { password_hash, ...userData } = user._doc;
    res.json({ data: userData });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.updateUser = async function (req, res) {
  try {
    const { new_description } = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.payload.user_id,
      { description: new_description },
      { new: true }
    );
    res.json({
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};
