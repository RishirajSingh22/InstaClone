// src/modules/comment/comment.repository.js (or your path)
import Comment from "../models/Comment.model.js";

export const createComment = (data) => {
  return Comment.create(data);
};

export const findCommentsByPost = (postId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return Comment.find({ post: postId, parentId: null })
    .populate("author", "username avatar")
    .populate({
      path: "replies",
      populate: {
        path: "author",
        select: "username avatar",
      },
    })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
};

export const findCommentById = (commentId) => {
  return Comment.findById(commentId);
};

export const deleteCommentById = (commentId) => {
  return Comment.findByIdAndDelete(commentId);
};

export const addReplyToComment = async (parentCommentId, replyId) => {
  return Comment.findByIdAndUpdate(
    parentCommentId,
    { $push: { replies: replyId } },
    { new: true }
  );
};
