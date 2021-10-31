//express 모듈 불러오기
var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// const Room = require("./model/room");
// const Chat = require("./model/chat");

const session = require("express-session");
const mongoStore = require("connect-mongo");

//express 사용
var app = express();

// socket
// const server = require("http").createServer(app);
// const io = require("socket.io").listen(server);
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  allowEIO3: true,
});

httpServer.listen(8080);
// var server = require("http").Server(app);
// var io = require("socket.io")(server);

// Middlewares
app.use(cors());

// session
app.use(
  session({
    secret: "dkssudgktpdy",
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: "mongodb://localhost:27017/ato" }),
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import Routes
const eventRoute = require("./routes/event");

const goodsRoute = require("./routes/goods");
const postRoute = require("./routes/post");
const reviewGoodsRoute = require("./routes/reviewGoods");
const userHistoryRoute = require("./routes/userHistory");

const chatRoute = require("./routes/chat");
// const { ppid } = require("process");

const userRoute = require("./routes/user");

const walletRoute = require("./routes/wallet");

app.use("/event", eventRoute);
app.use("/goods", goodsRoute);
app.use("/post", postRoute);
app.use("/reviewGoods", reviewGoodsRoute);
app.use("/userHistory", userHistoryRoute);

app.use("/chat", chatRoute);

app.use("/user", userRoute);

app.use("/goods", goodsRoute);
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use("/wallet", walletRoute);

// mongoose connect
mongoose
  // .connect("mongodb://3.36.124.62:27017/ato", {
  .connect("mongodb://localhost:27017/ato", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB ATO");
  })
  .catch((e) => {
    console.error(e);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("Hello World");
});

// http listen port 생성 서버 실행
app.listen(4000, () => console.log("Listening on port 4000"));
// connections = [];

// server.listen(5000);
console.log("Socket Server is running...");

// let ROOM;
// global.ROOM = ROOM;

// console.log("ROOM", ROOM);

// const room = io.of("/" + ROOM);
// const chat = io.of("/chatting");

// const getRoom = async (data) => {
//   let socket = "";
//   const room = await Room.findOne({
//     sellerId: data.sellerId,
//     customerId: data.customerId,
//   });

//   socket = room._id.toString();

//   return socket;
// };
// let roomId = "";
// chat.on("connection", function (socket) {
//   console.log("room 네임스페이스에 접속");
//   const req = socket.request;
//   //   [referer.split("/").length - 1].replace(/\?.+/, "");
//   // roomId = ROOM;
//   // console.log("--s-s-s-", ROOM);
//   socket.on("NodeJS Server Port", function (data) {
//     console.log("data : ", data.roomId);

//     roomId = data.roomId;
//   });

//   socket.on("send Msg", async function (data) {
//     console.log("send Msg data : ", data);
//     // data : roomId, msg, writer, goodsId
//     const content = await Chat.updateOne(
//       {
//         roomId: data.roomId,
//         goodsId: data.goodsId,
//       },
//       {
//         $push: {
//           content: {
//             message: data.message,
//             userId: data.writer,
//             sendTime: Date.now,
//           },
//         },
//       }
//     );
//   });
//   socket.on("e1", function (data) {
//     console.log("메세지 보냄 ", data);
//   });

//   // socket.join (방 아이디) join은 socket.IO에서 만들어준 메소드임.
//   console.log("?????? roomId : ", roomId);

//   // console.log("---data : ", data);
//   socket.emit("join-" + roomId, {
//     message: "서버에서 joined 보냄. ",
//   });
//   socket.to(roomId).emit("join", {
//     user: "system",
//     message: `aaaa님이 입장하셨습니다.`,
//   });
//   socket.on("disconnect", function (data) {
//     console.log("chat 네임스페이스 접속 해제");
//     // socket.leave(방 아이디) leav는 socket.IO에서 만들어준 메소드임.
//     socket.leave(roomId);
//     // connections.splice(connections.indexOf(socket), 1);
//     // console.log(
//     //   "Discconect: %s sockets are disconnected",
//     //   connections.length
//     // );
//   });
// });

// io.sockets.on("connection", function (socket) {
//   connections.push(socket);
//   console.log("Connect: %s sockets are connected", connections.length);

//   // disconnect
//   socket.on("disconnect", function (data) {
//     connections.splice(connections.indexOf(socket), 1);
//     console.log("Discconect: %s sockets are disconnected", connections.length);
//   });

//   socket.on("NodeJS Server Port", function (data) {
//     console.log(data);
//     io.sockets.emit("iOS Client Port", { message: "hi ios client!" });
//   });

//   socket.on("joinRoom", async function (data) {
//     // console.log("join room - ", data);
//     console.log("\n socket on joinRoom Data : ", data);
//     const roomId = await getRoom(data);
//     console.log("roomId : ", roomId);
//     // console.log("join room - ", roomId._id.toString());
//     socket.join(roomId);
//     console.log("채팅방에 join함");

//     io.sockets.emit("joinedRoom", { message: roomId + "\tjoin 완료" });

//     socket.on("event1", function (data) {
//       console.log("-----ios에서 보냄");
//       console.log(data);
//       socket.emit("e1", "sdfsdf");
//       // socket.to(data.room).emit("node to ios", {
//       //   roomId: data.room,
//       //   message: "특정 채팅방에 전송",
//       // });
//     });

//     socket.on("testJoin", async function (data) {
//       console.log("-----testJoin");
//       console.log(data);
//       io.sockets.emit("joinedRoom", { message: "dddddfsdfsdfs" });
//     });

//     // io.sockets.emit("node to ios", {
//     //   roomId: data.room,
//     //   message: "dddddfsdfsdfs"
//     // });
//   });
//   // io.sockets.emit("joinRoom", { message: data });

//   // socket.on()
// });

var connections = [];

io.sockets.on("connection", function (socket) {
  connections.push(socket);
  console.log("Connect: %s sockets are connected", connections.length);

  // disconnect
  socket.on("disconnect", function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log(data);
    console.log("Discconect: %s sockets are connected", connections.length);
  });

  socket.on("NodeJS Server Port", function (data) {
    console.log(data);
    io.sockets.emit("iOS Client Port", { message: "hi ios client!" });
  });
  socket.on("event1", function (data) {
    console.log("event1 data", data);

    // data : roomId, msg, writer, goodsId
    // const content =  Chat.updateOne(
    //   {
    //     roomId: data.roomId,
    //     // goodsId: data.goodsId,
    //   },
    //   {
    //     $push: {
    //       content: {
    //         message: data.message,
    //         userId: data.writer,
    //         sendTime: Date.now,
    //       },
    //     },
    //   }
    // );
    // });
    io.sockets.emit("e1", {
      message: data.message,
      writer: data.writer,
      roomId: data.roomId,
    });
  });
  // socket.on()
});
