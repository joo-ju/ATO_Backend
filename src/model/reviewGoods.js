const mongoose = require("mongoose");

const { Schema } = mongoose;
const reviewGoodsSchema = new Schema({
  writer: { type: String, default: "" }, // 작성자
  goodsId: { type: String, default: "" }, // 구매한 상품 ID
  content: { type: String, default: "" }, // 내용
  score: { type: Number, default: 0 }, // 별점
  image: [], // 이미지
  tags: [], // 태그
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("reviewGoods", reviewGoodsSchema);
