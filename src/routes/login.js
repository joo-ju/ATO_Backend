const express = require("express");
const User = require("../model/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("login get");
});

// Specific User
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
