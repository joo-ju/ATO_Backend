// import Router from 'koa-router';
const Router = require("koa-router");

const buyGoods = require("./buyGoods");
const buyTicket = require("./buyTicket");
const category = require("./category");
const event = require("./event");
const goods = require("./goods");
const reviewEvent = require("./reviewEvent");
const reviewGoods = require("./reviewGoods");

const api = new Router();

// url /posts 이면 ./posts/index.js

api.use("/buyGoods", buyGoods.routes());
api.use("/buyTicket", buyTicket.routes());
api.use("/category", category.routes());
api.use("/event", event.routes());
api.use("/goods", goods.routes());
api.use("/reviewEvent", reviewEvent.routes());
api.use("/reviewGoods", reviewGoods.routes());

// 라우터를 내보냅니다.
module.exports = api;
// exports.defalut = api;
