const mongoose = require("mongoose");

const { Schema } = mongoose;
const buyGoodsSchema = new Schema({
  buyerId: { type: String }, // 구매자 ID
  goodsId: { type: String }, // 상품 ID
  amount: { type: Number }, // 구매 티켓 갯수
  price: { type: Number }, // 결제 금액
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
});
module.exports = mongoose.model("buyGoods", buyGoodsSchema);
