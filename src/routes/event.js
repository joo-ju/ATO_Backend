const express = require("express");
const Event = require("../model/event");
const router = express.Router();
const multer = require("multer");

// image upload directory
const storage = multer.diskStorage({
  destination: "./images/event",
  filename: (req, file, cb) => {
    // not working on new Date().toISOString()
    cb(null, Date.now() + "_" + file.originalname);
  },
});

let fileFilter = function (req, file, cb) {
  var allowedMimes = ["image/jpeg", "image/jpg", "image/pjpeg", "image/png"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        success: false,
        message: "Invalid file type. Only jpg, png image files are allowed.",
      },
      false
    );
  }
};

const upload = multer({
  storage: storage,
  // limits: { fileSize: 100 * 1024 * 1024 },
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: fileFilter,
});

// All events
router.get("/", async (req, res) => {
  try {
    console.log("get all events");
    const event = await Event.find();
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
});

// Find One Event
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById({ _id: req.params.eventId });
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
});

// can post 1-10 images
// router.post("/", upload.array("image", 10), async (req, res) => {
router.post("/", async (req, res) => {
  console.log(req.body);

  var filenames = [];

  const event = new Event({
    name: req.body.name,
    categoryId: req.body.categoryId,
    discription: req.body.discription,
    sellerId: req.body.sellerId,
    age: req.body.age,
    price: req.body.price,
    showTime: req.body.showTime,
    image: filenames,
  });

  event
    .save()
    // .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// Post only images
router.post("/image", upload.array("image", 10), async (req, res) => {
  console.log("req.files : ", req.files);
  console.log("req : ", req);
  console.log("req.body : ", req.body);
  var filenames = [];
  req.files.forEach((item) => {
    filenames.push(item.filename);
  });

  const event = new Event({
    image: filenames,
  });

  event
    .save()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      res.json({ message: err });
      console.log(err);
    });
});

// Display One Image
router.get("/image/:image", async (req, res) => {
  try {
    console.log(req.url.split("/")[2]);
    res.sendFile(req.url.split("/")[2], { root: "./images/event/" });
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: req.url,
    });
  }
});

// Update Event Only Images
router.put("/update/image/:eventId", upload.array("image", 10), async (req, res) => {
  try {
    var filenames = [];
    req.files.forEach((item) => {
      filenames.push(item.filename);
    });

    const updatedEvent = Event.updateOne(
      { _id: req.params.eventId },
      {
        $set: {
          image: filenames
        }
      },
      {
        upsert: true,
        new: true
      }
    )
    .exec()
    .then((data) => {
      res.json(data);
      console.log(data);w
    });

    // res.json(updatedEvent);
    // console.log(updatedEvent);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

// Delete Event Only Images
router.put("/image/delete/:eventId", async (req, res) => {
  try {
    const updatedEvent = await Event.updateOne(
      { _id: req.params.eventId },
      {
        $pull: {
          image: req.body.image,
        }
      },
      {
        upsert: true,
        new: true
      }
    ).exec();
    res.json(updatedEvent);
    console.log(updatedEvent);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a Event
router.put("/update/:eventId", async (req, res) => {
  try {
    const updatedEvent = Event.updateOne(
      { _id: req.params.eventId },
      {
        $set: {
          name: req.body.name,
          categoryId: req.body.categoryId,
          discription: req.body.discription,
          sellerId: req.body.sellerId,
          age: req.body.age,
          price: req.body.price,
          showTime: req.body.showTime,
          updateTime: Date.now()
        }
      },
      {
        upsert: true,
        new: true
      }
    )
    .exec()
    .then((data) => {
      res.json(data);
      console.log(data);
    });

    // res.json(updatedEvent);
    // console.log(updatedEvent);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update Event Only state
router.put("/update/state/:eventId", async (req, res) => {
  try {
    const updatedEvent = Event.updateOne(
      { _id: req.params.eventId },
      {
        $set: {
          state: req.body.state
        }
      },
      {
        upsert: true,
        new: true
      }
    )
    .exec()
    .then((data) => {
      res.json(data);
      console.log(data);
    });

    // res.json(updatedEvent);
    // console.log(updatedEvent);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

// Delete Event
router.delete("/:eventId", async (req, res) => {
  try {
    const removedEvent = await Event.deleteOne({ _id: req.params.eventId });
    res.json(removedEvent);
  } catch (err) {
    res.json({ message: err });
  }
});

// Find All Sale Events of User
router.get("/user/sale/all/:sellerId", async (req, res) => {
  try {
    console.log(req.params.sellerId);
    const event = await Event.find({
      sellerId: req.params.sellerId,
      state: "판매중",
    });

    res.json(event);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: event,
    });
  }
});

// Find All Sold Events of User
router.get("/user/sold/all/:sellerId", async (req, res) => {
  try {
    console.log(req.params.sellerId);
    const event = await Event.find({
      sellerId: req.params.sellerId,
      state: "판매완료",
    });

    res.json(event);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: event,
    });
  }
});

// Find All Hidden Events of User
router.get("/user/hiding/all/:sellerId", async (req, res) => {
  try {
    console.log(req.params.sellerId);
    const goods = await Event.find({
      sellerId: req.params.sellerId,
      state: "예약중",
    });

    res.json(event);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: event,
    });
  }
});

// Find All Bought Events of User
router.get("/user/buy/all/:buyerId", async (req, res) => {
  try {
    console.log(req.params.buyerId);
    const event = await Event.find({
      buyerId: req.params.buyerId,
      state: "판매완료",
    });

    res.json(event);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: event,
    });
  }
});

// Find Sale or Booking Events
router.get("/sale/all", async (req, res) => {
  try {
    const event = await Event.find({
      $or: [{ state: "판매중" }, { state: "예약중" }],
    });

    res.json(event);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: event,
    });
  }
});


module.exports = router;
