import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },   
    text: { type: String, required: true, trim: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
);
const Comment= mongoose.model("Comment", commentSchema);
export default Comment;
