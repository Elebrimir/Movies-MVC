"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "Usuari o Password no vàlid" });
  }

  const payload = { username: user.username, id: user._id };

  const SECRET = process.env.SECRET;

  const token = jwt.sign(payload, SECRET, { expiresIn: 60 * 30 });

  res.json({ username: user.username, userID: user._id, token });
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save().catch((error) => {
    res.status(400).json({ error: error.message });
  });

  res.json(savedUser, username);
};
