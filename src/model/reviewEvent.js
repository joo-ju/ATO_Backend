const mongoose = require("mongoose");

const { Schema } = mongoose;
const reviewEventSchema = new Schema({
  writer: { type: String }, // 작성자
  ticketId: { type: String }, // 구매한 행사 ID
  content: { type: String }, // 내용
  score: { type: Number }, // 별점
  image: [], // 이미지
  tags: [], // 태그
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("reviewEvent", reviewEventSchema);
