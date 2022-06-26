const mongoose = require("mongoose");

const { Schema } = mongoose;
const eventSchema = new Schema({
  name: { type: String }, // 행사 이름
  categoryId: { type: String }, // 카테고리(생일 등)
  discription: { type: String }, // 행사 설명
  sellerId: { type: String }, // 주최자 ID
  buyerId: [{ type: String }], // 구매자 ID
  state: { type: String, default: "판매중" }, // 판매중, 예약 등 상태
  age: { type: Number }, // 연령 제한(_세 이상)
  price: { type: Number }, // 결제 금액
  score: { type: Number, default: 0 }, // 별점 점수
  count: { type: Number, default: 0 }, // 후기 갯수
  wishCount: { type: Number, default: 0 }, // 찜 갯수
  wishUser: [],
  chat: { type: Number, default: 0 }, // 채팅 갯수
  review: { type: Number, default: 0 }, // 채팅 갯수
  image: [{ type: String, required: true }], // 이미지
  tags: [], // 태그
  showTime: [
    {
      dateTime: Date, // 행사 날짜
      amount: Number, // 좌석 갯수
    },
  ],
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("event", eventSchema);
