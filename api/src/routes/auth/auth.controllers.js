const { User } = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports.signUp = async function (req, res) {
  try {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);
    const user = await User.create({
      username,
      password_hash: passwordHash,
    });
    const token = jwt.sign({ user_id: user._id }, config.ACCESS_TOKEN_SECRET);
    res.send({ token });
  } catch (error) {
    res
      .status(400)
      .send({ error: error.message, details: JSON.stringify(error) });
  }
};

module.exports.login = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      throw new Error("Incorrect username or password");
    const token = jwt.sign({ user_id: user._id }, config.ACCESS_TOKEN_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(400).send({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};
