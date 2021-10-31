const express = require("express");
const Goods = require("../model/goods");
const Wallet = require("../model/wallet");
const User = require("../model/user");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");

const blockchain_url = "http://localhost:3001/api/";
var goodskeynum = 2;

// image upload directory
const storage = multer.diskStorage({
  destination: "./images/goods",
  filename: (req, file, cb) => {
    // not working on new Date().toISOString()
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// check image extension
// const fileFilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(png|jpg)$/)) {
//     cb(null, false);
//   } else {
//     cb(null, true);
//   }
// };

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

// can post 1-5 images
router.post("/", upload.array("image", 5), async (req, res) => {
  // console.log(req.files);
  console.log(req.body);

  var filenames = [];
  // req.files.forEach((item) => {
  //   filenames.push(item.filename);
  // });
  
  const goods = new Goods({
    title: req.body.title,
    key: "GD" + String(goodskeynum++),
    categoryId: req.body.categoryId,
    content: req.body.content,
    sellerId: req.body.sellerId,
    price: req.body.price,
    tags: req.body.tags,
    image: filenames,
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
  
  const user = await User.findOne({ userId: req.body.sellerId });
  console.log(user.username);
  const wallet = await Wallet.findOne({ userId: req.body.sellerId });
  console.log(wallet._id);
  
  await axios.get(
    encodeURI(
      blockchain_url +
        "setGoods?title=" + req.body.title +
        "&state=판매중" +
        "&seller=" + user.username +
        "&category=" + req.body.categoryId +
        "&price=" + req.body.price +
        "&content=" + req.body.content +
        "&walletid=" + wallet._id
    )).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
});

// post only images
router.post("/image", upload.array("image", 5), async (req, res) => {
  console.log("req.files : ", req.files);
  console.log("req : ", req);
  console.log("req.body : ", req.body);
  var filenames = [];
  req.files.forEach((item) => {
    filenames.push(item.filename);
  });

  const goods = new Goods({
    image: filenames,
  });

  goods
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

// display 1 image
router.get("/image/:image", async (req, res) => {
  try {
    console.log(req.url.split("/")[2]);
    res.sendFile(req.url.split("/")[2], { root: "./images/goods/" });
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: req.url,
    });
  }
});

router.get("/", async (rea, res) => {
  try {
    const goods = await Goods.find();
    res.json(goods);

    await axios.get(blockchain_url + "getAllGoods")
      .then((res) => {
        console.log(res.data);
        console.log(res.data[(res.data).length - 1].Key);
      }).catch((err) => {
        console.log(err);
      });
      
  } catch (err) {
    res.json({ message: err });
  }
});

// id 받아서 1개 보내기
router.get("/fetchOne/:id", async (req, res) => {
  //   let post;
  try {
    console.log(req.params.id);
    const goods = await Goods.findOne({ _id: req.params.id });

    res.json(
      goods
      //   error: false,
      //   message: "Success retrived all books",
      //   "data": post,
      //   post,
    );

    await axios.get(blockchain_url + "getGoods?goodskey=" + goods.key)
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
      
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: goods,
    });
  }
});

router.get("/wish/fetchOne/:id", async (req, res) => {
  //   let post;
  try {
    console.log(req.params.id);
    const goods = await Goods.find({ _id: req.params.id });

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

// 로그인한 유저의 판매중인 제품 가져오기
router.get("/user/sale/all/:sellerId", async (req, res) => {
  //   let post;
  try {
    console.log(req.params.sellerId);
    const goods = await Goods.find({
      sellerId: req.params.sellerId,
      state: "판매중",
    });

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

// 로그인한 유저의 판매완료 제품 가져오기
router.get("/user/sold/all/:sellerId", async (req, res) => {
  //   let post;
  try {
    console.log(req.params.sellerId);
    const goods = await Goods.find({
      sellerId: req.params.sellerId,
      state: "판매완료",
    });

    res.json(goods);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: goods,
    });
  }
});

// 로그인한 유저의 숨김 제품 가져오기
router.get("/user/hiding/all/:sellerId", async (req, res) => {
  //   let post;
  try {
    console.log(req.params.sellerId);
    const goods = await Goods.find({
      sellerId: req.params.sellerId,
      state: "숨김",
    });

    res.json(goods);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: goods,
    });
  }
});

// 로그인한 유저가 구매한 제품 가져오기
router.get("/user/buy/all/:buyerId", async (req, res) => {
  //   let post;
  try {
    console.log(req.params.buyerId);
    const goods = await Goods.find({
      buyerId: req.params.buyerId,
      state: "판매완료",
    });

    res.json(goods);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: goods,
    });
  }
});

router.get("/sale/all", async (req, res) => {
  //   let post;
  try {
    const goods = await Goods.find({
      $or: [{ state: "판매중" }, { state: "예약중" }],
    });

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
          updateTime: Date.now(),
          sellerId: req.body.sellerId,
        },
      },
      {
        upsert: true,
        new: true,
      }
    ).exec();

    res.json(updatedPost);
    console.log(updatedPost);

    const goods = await Goods.findOne({ _id: req.body.id });

    await axios.get(
        blockchain_url + 
          "changeGoodsPrice?goodskey=" + goods.key + 
          "&price=" + req.body.price
      ).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })

  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.put("/update/status", async (req, res) => {
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
          state: req.body.status,
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

// 판매완료 및 구매자 이름 등록
// router.put("/update/buyerId", async (req, res) => {
//   // try {
//     // const updatedPost = Post.updateOne(req.params.postId, req.body, {
//     //   upsert: true,
//     //   new: true,
//     // }).exec();
//     console.log(req.body);
//     const updatedPost = Goods.updateOne(
//       { _id: req.body.id },
//       {
//         $set: {
//           buyerId: req.body.buyerId,
//           state: "판매중",
//         },
//       },
//       {
//         upsert: true,
//         new: true,
//       }
//     ).exec();

//     res.json(updatedPost);
//     console.log(updatedPost);

//     const goods = await Goods.findOne({ _id: req.body.id });
//     console.log(goods);

//     // await axios.get(
//     //   encodeURI(
//     //     blockchain_url + 
//     //       "purchaseGoods?walletid=" + req.body.buyerId +
//     //       "&goodskey=" + goods.key
//     //   )).then((res) => {
//     //     console.log(res.data);
//     //   }).catch((err) => {
//     //     console.log(err);
//     //   });
    
//     // update seller wallet
//     const sellerwallet = await Wallet.findOne({ userId: req.body.userId });
//     const balance = sellerwallet.balance + req.body.cost;

//     const updatedsellerHistory = await WalletHistory.updateOne(
//       { userId: req.body.userId },
//       {
//         $push: {
//           content: {
//             cost: goods.price,
//             balance: balance,
//             type: "sell",
//           },
//         },
//       }
//     ).exec();
    
//     // res.json(updatedWalletHistory);
//     console.log(updatedsellerHistory);

//     const updatedsellerWallet = await Wallet.updateOne(
//       { userId: req.body.userId },
//       {
//         $set: {
//           balance: balance,
//           updatedTime: Date.now(),
//         },
//       }
//     ).exec();
    
//     res.json(updatedsellerWallet);
//     console.log(updatedsellerWallet);
    
//     const seller = await User.findOne({ userId: goods.sellerId });

//     await axios.get(
//       blockchain_url + 
//         "/setWallet?name=" + user.username +
//         "&id=" + wallet._id + 
//         "&coin=" + balance
//     ).then((res) => {
//       console.log(res.data);
//     }).catch((err) => {
//       console.log(err);
//     });
    
//   // } catch (err) {
//   //   console.log(err);
//   //   res.json({ message: err });
//   // }
// });

module.exports = router;
