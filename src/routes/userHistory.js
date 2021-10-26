const express = require("express");
const UserHistory = require("../model/userHistory");
const Goods = require("../model/goods");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const userhistory = new UserHistory({
    userId: req.body.userId,
  });
  userhistory
    .save()
    // .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// router.put("/wishGoods", async (req, res) => {
//   try {
//     console.log(req.body);
//     // const goods = await Goods.findById(req.body.goodsId);
//     const userhistory = await UserHistory.updateOne(
//       { userId: req.body.userId },
//       {
//         $push: {
//           wishGoods: req.body.goodsId,
//         },
//       },
//       {
//         upsert: true,
//         new: true,
//       }
//     ).exec();
//     res.json(userhistory);
//     console.log(userhistory);
//   } catch (err) {
//     console.log(err);
//     res.json({ message: err });
//   }
// });
router.put("/wishGoods", async (req, res) => {
  try {
    // const updatedPost = Post.updateOne(req.params.postId, req.body, {
    //   upsert: true,
    //   new: true,
    // }).exec();
    console.log(req.body);
    const updatedPost = await UserHistory.updateOne(
      { userId: req.body.userId },
      {
        $push: {
          wishGoods: req.body.goodsId,
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
router.put("/wishGoods/delete", async (req, res) => {
  try {
    // const updatedPost = Post.updateOne(req.params.postId, req.body, {
    //   upsert: true,
    //   new: true,
    // }).exec();
    console.log(req.body);
    const updatedPost = await UserHistory.updateOne(
      { userId: req.body.userId },
      {
        $pull: {
          wishGoods: req.body.goodsId,
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
// 내가 찜한 상품들 조회
router.get("/user/:userId", async (req, res) => {
  try {
    console.log(req.params.userId);
    const userhistory = await UserHistory.findOne({
      userId: req.params.userId,
      //    state: "판매중",
    });
    // data = goodsArray(userhistory.wishGoods);
    //    for (const element of userhistory.wishGoods) {

    //   }
    // userhistory.wishGoods.forEach(async (element) => {
    //   console.log("element", element);
    //   const each = await Goods.findOne({ _id: element });

    //   //   console.log("each : ", each);
    //   await data.push(each);

    //   console.log("data : ", data);
    // });

    await res.json(userhistory);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

// wishGoods의 Goods들을 조회
router.get("/user/wishGoods/:userId", async (req, res) => {
  try {
    let userhistory = await UserHistory.findOne({
      userId: req.params.userId,
    });

    const goods = await Goods.find({
      _id: {
        $in: userhistory.wishGoods,
      },
    });

    res.json(goods);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});
module.exports = router;
