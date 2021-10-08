const express = require("express");
const Post = require("../model/post");
const router = express.Router();

router.post("/createpost", async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    post: req.body.post,
  });
  post
    .save()
    // .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/", async (req, res) => {
  //   let post;
  try {
    const post = await Post.find();

    res.json(
      post
      //   error: false,
      //   message: "Success retrived all books",
      //   "data": post,
      //   post,
    );
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: post,
    });
  }
});

// router.put("/updatepost/:postId", async (req, res) => {
//   try {
//     // const updatedPost = Post.updateOne(req.params.postId, req.body, {
//     //   upsert: true,
//     //   new: true,
//     // }).exec();
//     const updatedPost = Post.updateOne(
//       { _id: req.params.postId },
//       {
//         $set: { title: req.body.title, post: req.body.post },
//       },
//       {
//         upsert: true,
//         new: true,
//       }
//     ).exec();
//     res.json(updatedPost);
//     console.log(updatedPost);
//   } catch (err) {
//     console.log(err);
//     res.json({ message: err });
//   }
// });

router.put("/updatepost", async (req, res) => {
  try {
    // const updatedPost = Post.updateOne(req.params.postId, req.body, {
    //   upsert: true,
    //   new: true,
    // }).exec();
    console.log(req.body);
    const updatedPost = Post.updateOne(
      { _id: req.body.id },
      {
        $set: { title: req.body.title, post: req.body.post },
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
