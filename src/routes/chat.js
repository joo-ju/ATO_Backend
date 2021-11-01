const express = require("express");
const Room = require("../model/room");
const Chat = require("../model/chat");
const Goods = require("../model/goods");
const User = require("../model/user");
const UserHistory = require("../model/userHistory");
const router = express.Router();
// const UserHistory = require("../model/userHistory");

// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   allowEIO3: true,
// });

router.post("/", async (req, res) => {
  console.log(req.body);
  const existRoom = await Room.findOne({
    customerId: req.body.customerId,
    sellerId: req.body.sellerId,
    goodsId: req.body.goodsId,
  });
  if (existRoom == null) {
    console.log("채팅방이 없으므로 새로 만듭니다.");
    const room = new Room({
      customerId: req.body.customerId,
      sellerId: req.body.sellerId,
      goodsId: req.body.goodsId,
    });
    room
      .save()
      .then((data) => {
        const updateRoom = UserHistory.updateOne(
          {
            userId: req.body.customerId,
            goodsId: req.body.goodsId,
          },
          {
            $push: {
              chatRooms: data,
            },
          }
        )
          .exec()
          .then((update) => {
            console.log("유저히스토리에 추가");
          })
          .catch((err) => {
            console.log(err);
          });
        const updateRoom2 = UserHistory.updateOne(
          {
            userId: req.body.sellerId,
            goodsId: req.body.goodsId,
          },
          {
            $push: {
              chatRooms: data,
            },
          }
        )
          .exec()
          .then((update) => {
            console.log("유저히스토리에 추가");
          })
          .catch((err) => {
            console.log(err);
          });
        const chat = new Chat({
          goodsId: req.body.goodsId,
          roomId: data._id,
        });
        chat.save();
        res.json(data);

        ROOM = data._id.toString();
        console.log("ROOM : ", ROOM);
      })
      .catch((err) => {
        res.json({ message: err });
      });

    // userhistory에 삽입할 것.
  } else {
    console.log("이미 채팅방이 있습니다.");
    ROOM = existRoom._id.toString();
    console.log("ROOM : ", ROOM);
    res.json(existRoom);
  }
});

router.delete("/all", async (req, res) => {
  const result = await Room.remove({});

  res.json(result);
});

// // 유저가 속한 채팅방 조회 (대화, 유저, 상품
// router.get("/user/all/:userId", async (req, res) => {
//   var chatJSON = new Object();
//   var goodsJSON = [];
//   var userJSON = new Object();
//   var allJSON = [];
//   const room2 = await Room.find({
//     $or: [
//       {
//         sellerId: req.params.userId,
//       },
//       { customerId: req.params.userId },
//     ],
//   });
//   console.log(room2[0].goodsId);
//   console.log(room2.length);
//   // for (let i = 0; i < room2.length; i++) {

//   for (let i = 0; i < 3; i++) {
//     // if (room2[i].sellerId == req.params.userId || room2[i].sellerId != "") {
//     //   userJSON = await User.findOne({ _id: room2[i].customerId });
//     // } else if (
//     //   room2[i].customerId == req.params.userId ||
//     //   room2[i].customerId != ""
//     // ) {
//     //   userJSON = await User.findOne({ _id: room2[i].sellerId });
//     // }
//     // console.log("채팅 유저 정보 : ", userJSON);

//     var goods = await Goods.findOne({
//       _id: room2[i].goodsId,
//     });
//     var chat = await Chat.findOne({
//       roomId: room2[i].roomId,
//     });
//     // var a = chat.;
//     console.log(chat.contents);
//     await goodsJSON.push(goods);
//     // await goodsJSON.push({ content: a });

//     console.log("goodsJSON : ", goodsJSON);
//     console.log("\n");
//   }
//   // for (const obj in room2) {
//   //   console.log("obj : ", obj);

//   //   console.log(`${room2[obj]}`);
//   //   var each = room2[obj];
//   //   // for (const roomObj in each) {
//   //   //   console.log(`${each[roomObj]}`);
//   //   // }
//   // }
// });

// 유저의 채팅방 목록 조회
router.get("/user/all/:userId", async (req, res) => {
  //   let post;
  try {
    console.log("\n 유저가 참여한 모든 채팅방");
    console.log("/chat/user/all/", req.params.userId);
    const room2 = await Room.find({
      $or: [
        {
          sellerId: req.params.userId,
        },
        { customerId: req.params.userId },
      ],
    });
    console.log(room2);
    // const room = await UserHistory.findOne({
    //   userId: req.params.userId,
    // });
    // console.log("userhistory.chatRooms : ", room.chatRooms);
    // res.json(room.chatRooms);
    res.json(room2);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      // data: rooms,
    });
  }
});

router.get("/user/goods/all/:goodsId/:userId", async (req, res) => {
  //   let post;
  try {
    console.log(
      "/chat/user/goods/all/",
      req.params.goodsId,
      "/",
      req.params.userId
    );
    const room = await Room.find({
      goodsId: req.params.goodsId,
      sellerId: req.params.userId,
    });
    // console.log("userhistory.chatRooms : ", room.chatRooms);
    res.json(room);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: rooms,
    });
  }
});

router.get("/one/:sellerId/:goodsId/:customerId", async (req, res) => {
  //   let post;
  try {
    console.log(req.params.id);
    const room = await Room.findOne({
      customerId: req.params.customerId,
      goodsId: req.params.goodsId,
      sellerId: req.params.sellerId,
    });
    console.log("room", room);
    res.json(room);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: rooms,
    });
  }
});
router.get("/chat/:roomId/:goodsId", async (req, res) => {
  //   let post;
  try {
    const chat = await Chat.findOne({
      roomId: req.params.roomId,
      goodsId: req.params.goodsId,
    });
    console.log("chat : ", chat);
    res.json(chat.content);
  } catch (err) {
    res.json({
      error: false,
      message: err,
    });
  }
});

router.put("/message", async (req, res) => {
  try {
    console.log("메세지 추가 : ", req.body);
    const content = await Chat.updateOne(
      {
        roomId: req.body.roomId,
        // goodsId: req.body.goodsId,
      },
      {
        $push: {
          content: {
            message: req.body.message,
            userId: req.body.writer,
            // sendTime: Date.now,
          },
        },
      }
    ).exec();
    res.json(content);
    console.log(content);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

module.exports = router;
