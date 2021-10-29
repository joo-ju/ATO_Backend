const express = require("express");
const Goods = require("../model/goods");
const router = express.Router();
const multer = require("multer");

// image upload directory
const storage = multer.diskStorage({
  destination: "./images/goods",
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
  limits: { fileSize: 1024 * 1024 * 100 },
  fileFilter: fileFilter
});

// can post 1-5 images
router.post("/", upload.array('image', 5), async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  
  var filenames = [];
  req.files.forEach((item) => {
    filenames.push(item.filename);
  });

  const goods = new Goods({
    title: req.body.title,
    categoryId: req.body.categoryId,
    content: req.body.content,
    sellerId: req.body.sellerId,
    price: req.body.price,
    tags: req.body.tags,
    image: filenames
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

// post only images
router.post("/image", upload.array('image', 5), async (req, res) => {
  console.log(req.files);

  var filenames = [];
  req.files.forEach((item) => {
    filenames.push(item.filename);
  });

  const goods = new Goods({
    image: filenames
  });

  goods
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
})

// display 1 image
router.get("/image/:image", async (req, res) => {
  try {
    console.log(req.url.split('/')[2]);
    res.sendFile(req.url.split('/')[2], { root: './images/goods/'});
    
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: req.url
    });
  }
});

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
    const goods = await Goods.find({ state: "판매중" });

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
// id 받아서 1개 보내기
router.get("/one/:id", async (req, res) => {
  //   let post;
  try {
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
