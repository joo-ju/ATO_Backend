const mongoose = require("mongoose");

const { Schema } = mongoose;
const goodsSchema = new Schema({
  title: { type: String, default: "" }, // 제목
  key: { type: String, default: "GD0" }, // 블록체인 goods key
  categoryId: { type: String, default: "" }, // 카테고리(스티커, 엽서 등)
  content: { type: String, default: "" }, // 내용
  sellerId: { type: String, default: "" }, // 판매자
  buyerId: { type: String, default: "" }, // 구매자
  state: { type: String, default: "판매중" }, // 판매중, 예약 등 상태
  price: { type: Number, default: 0 }, // 결제 금액
  score: { type: Number, default: 0 }, // 별점 점수
  wishCount: { type: Number, default: 0 }, // 찜 갯수
  wishUser: [],
  chat: { type: Number, default: 0 }, // 채팅 갯수
  review: { type: Boolean, default: false }, // 채팅 갯수
  image: [{ type: String, required: true }], // 이미지
  tags: [], // 태그
  count: { type: Number, default: 0 }, // 후기 갯수
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("goods", goodsSchema);
