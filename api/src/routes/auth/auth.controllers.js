const { User } = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

function signToken(userId) {
  return jwt.sign({ user_id: userId.toString() }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: `${config.TOKEN_EXPIRATION_DAYS}d`,
  });
}

module.exports.signUp = async function (req, res) {
  try {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);
    const user = await User.create({
      username,
      password_hash: passwordHash,
    });
    const token = signToken(user._id);
    const { password_hash, ...userInfo } = user._doc;
    res.json({ token, user: userInfo });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, details: JSON.stringify(error) });
  }
};

module.exports.login = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      throw new Error("Incorrect username or password");
    const token = signToken(user._id);
    const { password_hash, ...userInfo } = user._doc;
    res.json({ token, user: userInfo });
  } catch (error) {
    res.status(400).send({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.verify = async function (req, res) {
  try {
    const token = req.body.token;
    const payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    const refreshedToken = signToken(payload.user_id);

    const user = await User.findById(payload.user_id);
    const { password_hash, ...userInfo } = user._doc;
    res.json({ token: refreshedToken, user: userInfo });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};
