const express = require("express");
const Goods = require("../model/goods");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const goods = new Goods({
    title: req.body.name,
    categoryId: req.body.categoryId,
    content: req.body.discription,
    sellerId: req.body.sellerId,
  });
  goods
    .save()
    // .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
