const express = require("express");
const Event = require("../model/event");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("event get");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const event = new Event({
    name: req.body.name,
    categoryId: req.body.categoryId,
    discription: req.body.discription,
    sellerId: req.body.sellerId,
    age: req.body.age,
    price: req.body.price,
    score: req.body.score,
    count: req.body.count,
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

// Specific Event
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a Event
router.patch("/:eventId", async (req, res) => {
  try {
    const updatedEvent = Event.updateOne(
      { _id: req.params.eventId },
      {
        $set: { name: req.body.name },
      }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete Event
router.delete("/:eventId", async (req, res) => {
  try {
    const removedEvent = await Event.remove({ _id: req.params.eventId });
    res.json(removedEvent);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
