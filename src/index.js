//express 모듈 불러오기
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
//express 사용
const app = express();

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
