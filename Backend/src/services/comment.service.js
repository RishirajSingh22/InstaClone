// src/services/comment.service.js (or your actual path)

// import *all* exported functions as an object
import * as CommentRepository from "../repositories/comment.repository.js";
import * as PostRepository from "../repositories/post.repository.js";

export const deleteComment = async (commentId, userId) => {
  const comment = await CommentRepository.findCommentById(commentId);
  if (!comment) throw new Error("Comment not found");

  if (comment.author.toString() !== userId) {
    throw new Error("Not authorized to delete this comment");
  }

  await CommentRepository.deleteCommentById(commentId);
  await PostRepository.decrementCommentsCount(comment.post);
};
