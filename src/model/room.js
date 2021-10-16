const mongoose = require("mongoose");

const { Schema } = mongoose;
const roomSchema = new Schema({
  sellerId: { type: String, default: "" }, // 판매자
  customerId: { type: String, default: "" }, // 구매 희망자
  isDeleted: { type: Boolean, default: false },
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("rooms", roomSchema);
