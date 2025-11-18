// src/models/post.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    caption: { type: String, trim: true },
    imageUrl: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    commentsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
// or: export { Post };
