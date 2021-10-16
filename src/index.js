//express 모듈 불러오기
var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import Routes

const signUpRoute = require("./routes/signUp");
const loginRoute = require("./routes/login");
const eventRoute = require("./routes/event");
const goodsRoute = require("./routes/goods");
const postRoute = require("./routes/post");
const reviewGoodsRoute = require("./routes/reviewGoods");
const userHistoryRoute = require("./routes/userHistory");

app.use("/signUp", loginRoute);
app.use("/event", eventRoute);
app.use("/goods", goodsRoute);
app.use("/post", postRoute);
app.use("/reviewGoods", reviewGoodsRoute);
app.use("/userHistory", userHistoryRoute);
// mongoose connect
mongoose
  // .connect("mongodb://3.31.140.23:27017/ato", {
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

connections = [];
// server.listen(5000);
console.log("Socket Server is running...");

io.sockets.on("connection", function (socket) {
  connections.push(socket);
  console.log("Connect: %s sockets are connected", connections.length);

  // disconnect
  socket.on("disconnect", function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Discconect: %s sockets are connected", connections.length);
  });

  socket.on("NodeJS Server Port", function (data) {
    console.log(data);
    io.sockets.emit("iOS Client Port", { message: "h i ios client!" });
  });
  socket.on("event1", function (data) {
    console.log(data);
    io.sockets.emit("e1", { message: data });
  });
  // socket.on()
});
