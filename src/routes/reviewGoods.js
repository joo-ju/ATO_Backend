const express = require("express");
const ReviewGoods = require("../model/reviewGoods");
const Goods = require("../model/goods");
const User = require("../model/user");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const reviewGoods = new ReviewGoods({
    writer: req.body.writer,
    goodsId: req.body.goodsId,
    content: req.body.content,
    score: req.body.score,
  });
  reviewGoods.save();
  // try {
  const user = await User.updateOne(
    {
      _id: req.body.writer,
    },
    {
      $inc: {
        score: req.body.score,
        count: 1,
      },
    }
  );
  const goods = await Goods.updateOne(
    { _id: req.body.goodsId },
    {
      $set: {
        review: true,
      },
    },
    {
      upsert: false,
    }
  )

    .exec()
    .then((data) => {
      console.log("리뷰 추가 및 점수 추가ㄴ");
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  console.log("User : ", user);
  console.log("ReviewGoods: ", reviewGoods);
});

//  리뷰 1개 조회
router.get("/user/one/:userId/:goodsId", async (req, res) => {
  //   let post;
  try {
    const reviewGoods = await ReviewGoods.findOne({
      goodsId: req.params.goodsId,
      writer: req.params.userId,
    });

    res.json(
      reviewGoods
      //   error: false,
      //   message: "Success retrived all books",
      //   "data": post,
      //   post,
    );
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: goods,
    });
  }
});

module.exports = router;
