const mongoose = require("mongoose");

const { Schema } = mongoose;
const chatSchema = new Schema({
  roomId: { type: String, default: "" }, // 채팅방 ID
  goodsId: [{ type: String, default: "" }], // 상품
  //   sellerId: { type: String, default: "" }, // 판매자
  //   customerId: { type: String, default: "" }, // 구매 희망자
  content: {
    message: { type: String }, // 메세제 내용
    userId: { type: String }, // 작성자
    sendTime: { type: Date },
  }, // 메세지들
  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("chats", chatSchema);
