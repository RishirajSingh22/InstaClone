import * as CommentService from "../services/comment.service.js";

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    await CommentService.deleteComment(commentId, userId);
    return res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("deleteComment:", err);
    return res.status(400).json({ message: err.message || "Failed to delete comment" });
  }
};


