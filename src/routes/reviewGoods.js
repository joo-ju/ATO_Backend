const express = require("express");
const ReviewGoods = require("../model/reviewGoods");
const Goods = require("../model/goods");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const reviewGoods = new ReviewGoods({
    writer: req.body.writer,
    goodsId: req.body.goodsId,
    content: req.body.content,
    score: req.body.score,
    tags: req.body.tags,
  });
  try {
    const goods = await Goods.updateOne(
      { _id: req.body.goodsId },
      {
        $inc: {
          score: req.body.score,
          count: 1,
        },
        $set: {
          review: true,
        },
      },
      {
        upsert: false,
      }
    ).exec();
    console.log("거래 글 정보 : ", goods);

    reviewGoods.save();
  } catch (e) {
    res.json({ message: e });
  }

  res.json(reviewGoods);
});
module.exports = router;
