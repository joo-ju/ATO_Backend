const express = require("express");
const User = require("../model/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("sign up get");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    nickname: req.body.nickname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    score: req.body.score,
    count: req.body.count,
  });

  user
    .save()
    // .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
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

// Update User
router.patch("/:userId", async (req, res) => {
  try {
    const updateduser = User.updateOne(
      { _id: req.params.userId },
      {
        $set: { nickname: req.body.nickname },
      }
    );
    res.json(updateduser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete User
router.delete("/:userId", async (req, res) => {
  try {
    const removeduser = await User.remove({ _id: req.params.userId });
    res.json(removeduser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
