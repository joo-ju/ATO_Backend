const express = require("express");
const Room = require("../model/room");
const Chat = require("../model/chat");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const room = new Room({
    customerId: req.body.customerId,
    sellerId: req.body.sellerId,
  });
  room
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
