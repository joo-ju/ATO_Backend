const mongoose = require("mongoose");

const { Schema } = mongoose;
const categorySchema = new Schema({
  name: { type: String }, // 카테고리 이름
});
module.exports = mongoose.model("category", categorySchema);
