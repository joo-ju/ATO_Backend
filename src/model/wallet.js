const mongoose = require("mongoose");

const { Schema } = mongoose;
const walletSchema = new Schema({
  userId: { type: String }, // 사용자
  balance: { type: Number }, // 잔액
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});

module.exports = mongoose.model("wallet", walletSchema);
