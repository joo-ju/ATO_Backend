const mongoose = require("mongoose");

const { Schema } = mongoose;
const walletHistorySchema = new Schema({
  userId: { type: String }, // 사용자
  walletId: { type: String },
  content: [
    {
      cost: { type: Number }, // 지갑 내역 (+ 충전, - 사용금액)
      balance: { type: Number }, // 잔액
      type: { type: String }, // 유형 (charge, sell, goodsId)
      enrollTime: { type: Date, default: Date.now },
    },
  ],
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});

module.exports = mongoose.model("walletHistory", walletHistorySchema);
