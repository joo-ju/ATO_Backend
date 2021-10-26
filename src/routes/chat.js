const express = require("express");
const Room = require("../model/room");
const Chat = require("../model/chat");
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
// 유저의 채팅방 목록 조회
router.get("/user/all/:userId", async (req, res) => {
  //   let post;
  try {
    console.log("/chat/user/all/", req.params.userId);
    const room = await UserHistory.findOne({
      userId: req.params.userId,
    });
    // console.log("userhistory.chatRooms : ", room.chatRooms);
    res.json(room.chatRooms);
  } catch (err) {
    res.json({
      error: false,
      message: err,
      data: rooms,
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
      data: rooms,
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
// router.get("/one", async (req, res) => {

//   // const room = new Room({
//   //   customerId: req.body.customerId,
//   //   sellerId: req.body.sellerId,
//   // });
//   // room
//   //   .save()
//   //   .then((data) => {
//   //     res.json(data);
//   //   })
//   //   .catch((err) => {
//   //     res.json({ message: err });
//   //   });

//   io.sockets.on("connection", function (socket) {
//     connections.push(socket);
//     console.log("Connect: %s sockets are connected", connections.length);

//     // disconnect
//     socket.on("disconnect", function (data) {
//       connections.splice(connections.indexOf(socket), 1);
//       console.log("Discconect: %s sockets are connected", connections.length);
//     });

//     socket.on("NodeJS Server Port", function (data) {
//       console.log(data);
//       io.sockets.emit("iOS Client Port", { message: "hi ios client!" });
//     });
//     socket.on("event1", function (data) {
//       console.log(data);
//       io.sockets.emit("e1", { message: data });
//     });
//     // socket.on()
//   });
// });

module.exports = router;
