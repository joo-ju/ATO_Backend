//express 모듈 불러오기
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const mongoStore = require("connect-mongo");

//express 사용
const app = express();

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
const userRoute = require("./routes/user");
// const signUpRoute = require("./routes/signUp");
// const loginRoute = require("./routes/login");

app.use("/events", eventRoute);
// app.use("/signUp", signUpRoute);
// app.use("/login", loginRoute);
app.use("/user", userRoute);
// mongoose connect
mongoose
  .connect("mongodb://localhost:27017/ato", {
    // .connect("mongodb://3.31.140.23:27017/ato", {
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
