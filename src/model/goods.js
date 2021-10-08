const mongoose = require("mongoose");

const { Schema } = mongoose;
const goodsSchema = new Schema({
  title: { type: String }, // 제목
  categoryId: { type: String }, // 카테고리(스티커, 엽서 등)
  content: { type: String }, // 내용
  sellerId: { type: String }, // 판매자
  buyerId: { type: String }, // 구매자
  state: { type: String, default: "판매중" }, // 판매중, 예약 등 상태
  price: { type: Number }, // 결제 금액
  score: { type: Number }, // 별점 점수
  image: [], // 이미지
  tags: [], // 태그
  count: { type: Number }, // 후기 갯수
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("goods", goodsSchema);
