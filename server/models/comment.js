const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    username: { type: String, maxLength: 50 },
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
