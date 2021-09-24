const mongoose = require("mongoose");

const { Schema } = mongoose;
const eventSchema = new Schema({
  name: { type: String }, // 행사 이름
  categoryId: { type: String }, // 카테고리(생일 등)
  discription: { type: String }, // 행사 설명
  sellerId: { type: String }, // 주최자 ID
  age: { type: Number }, // 연령 제한(_세 이상)
  price: { type: Number }, // 결제 금액
  score: { type: Number, default: 0 }, // 별점 점수
  count: { type: Number, default: 0 }, // 후기 갯수
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
