const mongoose = require("mongoose");

const { Schema } = mongoose;
const buyTicketSchema = new Schema({
  buyerId: { type: String }, // 구매자 ID
  eventId: { type: String }, // 행사 ID
  amount: { type: Number }, // 구매 티켓 갯수
  eventDateTime: { type: String }, // 행사 시간 (날짜 + 시간)
  state: { type: String }, // 취소 여부
  price: { type: Number }, // 결제 금액
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("buyTicket", buyTicketSchema);
