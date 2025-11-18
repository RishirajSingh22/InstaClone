import express from "express";
const router = express.Router();
import {auth} from "../middlewares/auth.middleware.js";
import * as PostController from "../controllers/post.controller.js";
import * as CommentController from "../controllers/comment.controller.js";
import upload from "../middlewares/upload.middleware.js";

// create post
router.post("/", auth, upload.single("imageUrl"), PostController.createPost);

// get all posts (feed)
router.get("/", auth, PostController.getAllPosts);

// get single post
router.get("/:postId", auth, PostController.getPostById);

// get all posts by a specific user
router.get("/user/:userId", auth, PostController.getUserPosts);

// update caption
router.patch("/:postId", auth, PostController.updateCaption);

// delete post
router.delete("/:postId", auth, PostController.deletePost);

// toggle like
router.post("/:postId/toggle-like", auth, PostController.toggleLikePost);

// add comment
router.post("/:postId/comments", auth,PostController.addComment);

// Add reply to a comment
router.post("/comments/:commentId/replies", auth, PostController.addReplyToComment);

// get all comments for a post
router.get("/:postId/comments", auth, PostController.getCommentsForPost);

// delete a comment
router.delete("/comments/:commentId", auth, CommentController.deleteComment);

export default router;
