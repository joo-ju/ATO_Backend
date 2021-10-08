const mongoose = require("mongoose");

const { Schema } = mongoose;
const postSchema = new Schema({
  title: { type: String }, // 제목
  post: { type: String }, // 카테고리(스티커, 엽서 등)

  enrollTime: { type: Date, default: Date.now }, // 등록 시간
  updateTime: { type: Date, default: Date.now }, // 마지막 수정 시간
  deleteTime: { type: Date }, // 취소 시간
});
module.exports = mongoose.model("post", postSchema);
