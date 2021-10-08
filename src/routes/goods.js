const express = require("express");
const Goods = require("../model/goods");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const goods = new Goods({
    title: req.body.title,
    categoryId: req.body.categoryId,
    content: req.body.content,
    sellerId: req.body.sellerId,
    price: req.body.price,
    tags: req.body.tags,
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

router.get("/fetchOne/:id", async (req, res) => {
  //   let post;
  try {
    console.log(req.params.id);
    const goods = await Goods.findById(req.params.id);

    res.json(
      goods
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
router.get("/", async (req, res) => {
  //   let post;
  try {
    const goods = await Goods.find();

    res.json(
      goods
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
router.put("/updateGoods", async (req, res) => {
  try {
    // const updatedPost = Post.updateOne(req.params.postId, req.body, {
    //   upsert: true,
    //   new: true,
    // }).exec();
    console.log(req.body);
    const updatedPost = Goods.updateOne(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          price: req.body.price,
          tags: req.body.tags,
        },
      },
      {
        upsert: true,
        new: true,
      }
    ).exec();
    res.json(updatedPost);
    console.log(updatedPost);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});
module.exports = router;
