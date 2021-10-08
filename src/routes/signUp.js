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

// Specific User by username(id)
router.get("/:username", async (req, res) => {
  try {
    const user = await User.find({ username: req.params.username });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update User
router.patch("/:username", async (req, res) => {
  try {
    const updateduser = User.updateOne(
      { username: req.params.username },
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
router.delete("/:userusernameId", async (req, res) => {
  try {
    const removeduser = await User.remove({ username: req.params.username });
    res.json(removeduser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
