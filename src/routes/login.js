const express = require("express");
const { db } = require("../model/user");
const User = require("../model/user");
const router = express.Router();

// All Users
router.get("/", async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

// Specific User by username(id)
router.get("/:username", async (req, res) => {
  try {
    const user = await User.find({ username: req.params.username });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
