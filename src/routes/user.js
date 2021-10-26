const express = require("express");
const User = require("../model/user");
const router = express.Router();
const multer = require("multer");

// image upload directory
const storage = multer.diskStorage({
  destination: "./images/user",
  filename: (req, file, cb) => {
    // not working on new Date().toISOString()
    cb(null, Date.now() + "_" + file.originalname);
  }
});

// check image extension
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg)$/)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

// All Users
router.get("/", async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

// Find One User
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: user,
    });
  }
})

router.post("/login", async (req, res) => {
  User.find({ username: req.body.username, password: req.body.password })
    .then((data) => {
      if (data.length) {
        req.session.user = {
          id: data[0]._id,
          username: data[0].username,
          authorized: true,
        };
        res.send({ user: req.session.user });
      } else {
        res.json({
          status: "Failed",
          message: "Not exist user",
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
    req.session
      .destroy(() => {
        res.json({ message: "remove session and logout account" });
        res.redirect("/");
        console.log(req.session);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.json({ message: "not login status" });
  }
});

router.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    nickname: req.body.nickname,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    if (
      user.username == "" ||
      user.password == "" ||
      user.name == "" ||
      user.email == "" ||
      user.phone == ""
    ) {
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

// Display Image
router.get("/userimage/:image", async (req, res) => {
  try {
    console.log(req.url.split('/')[2]);
    res.sendFile(req.url.split('/')[2], { root: './images/user/'});

  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: req.url
    });
  }
});

// Update Only User Image
router.put("/userimage/:username", upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);
    const updatedUser = await User.updateOne(
      { username: req.params.username },
      {
        $set: { image: req.file.filename },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update User
router.put("/:userId", upload.single("image"), async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { username: req.params.userId },
      {
        $set: {
          password: req.body.password,
          name: req.body.name,
          nickname: req.body.nickname,
          email: req.bodyemail,
          phone: req.body.phone,
          image: req.file.filename,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
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
