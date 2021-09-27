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
const eventRoute = require("./routes/event");
const goodsRoute = require("./routes/goods");
app.use("/event", eventRoute);

app.use("/goods", goodsRoute);

// mongoose connect
mongoose
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
});

// http listen port 생성 서버 실행
app.listen(4000, () => console.log("Listening on port 4000"));
