const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String }, // 아이디
  password: { type: String }, // 비밀번호
  name: { type: String }, // 이름
  nickname: { type: String, default: "" }, // 닉네임
  email: { type: String }, // 이메일
  phone: { type: Number }, // 휴대폰 번호
  address: { type: String }, // 주소
  score: { type: Number, default: 0 }, // 점수
  count: { type: Number, default: 0 }, // 후기 갯수,
  image: { type: String, required: true },
});
module.exports = mongoose.model("user", userSchema);
