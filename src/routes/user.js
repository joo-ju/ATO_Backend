const express = require("express");
const User = require("../model/user");
const router = express.Router();

// All Users
router.get("/", async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

router.post("/login", async (req, res) => {
  User.find({ username: req.body.username, password: req.body.password })
    .then((data) => {
      if (data.length) {
        req.session.user = {
          id: data[0]._id,
          username: data[0].username,
          authorized: true
        };
        res.send({ session: req.session });
      } else {
        res.json({
          status: "Failed",
          message: "Not exist user"
        });
      }
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/logout", async (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    req.session.destroy(() => {
      res.json({ message: "remove session and logout account" });
      res.redirect("/");
      console.log(req.session);
    }).catch((err) => {
      res.json(err);
    })
  } else {
    res.json({ message: "not login status" });
  }
})

router.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    nickname: req.body.nickname,
    email: req.body.email,
    phone: req.body.phone
  });

  try {
    if (user.username == "" || user.password == "" || user.name == "" || user.email == "" || user.phone == "") {
      res.json({
        status: "Failed",
        message: "Empty input fields",
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
      // a@b.c
      res.json({
        status: "Failed",
        message: "Invalid email entered",
      });
    } else if (!/^\d+$/.test(user.phone)) {
      // only number
      res.json({
        status: "Failed",
        message: "Invalid phone number entered",
      });
    } else {
      User.find({ username: user.username })
        .then((data) => {
          if (data.length) {
            // already exist user
            res.json({
              status: "Failed",
              message: "Username already exists",
            });
          } else {
            // create new user
            user
              .save()
              .then((data) => {
                res.json(data);
              })
              .catch((err) => {
                res.json({ message: err });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({ message: err });
        });
    }
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

// Delete User
router.delete("/:username", async (req, res) => {
  try {
    const removeduser = await User.deleteOne({ username: req.params.username });
    res.json(removeduser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
