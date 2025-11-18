// src/controllers/post.controller.js
import * as PostService from "../services/post.service.js";

export const createPost = async (req, res) => {
  try {
    const { caption, imageUrl } = req.body;
    const userId = req.user.id; // make sure auth middleware sets this

    const post = await PostService.createPost(userId, caption, imageUrl);
    return res.status(201).json(post);
  } catch (err) {
    console.error("createPost:", err);
    return res
      .status(400)
      .json({ message: err.message || "Failed to create post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const posts = await PostService.getAllPosts(page, limit);
    return res.json(posts);
  } catch (err) {
    console.error("getAllPosts:", err);
    return res
      .status(500)
      .json({ message: err.message || "Failed to fetch posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostService.getPostById(postId);
    return res.json(post);
  } catch (err) {
    console.error("getPostById:", err);
    return res
      .status(404)
      .json({ message: err.message || "Post not found" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params; // or req.user.id for "my posts"
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const posts = await PostService.getUserPosts(userId, page, limit);
    return res.json(posts);
  } catch (err) {
    console.error("getUserPosts:", err);
    return res
      .status(500)
      .json({ message: err.message || "Failed to fetch user posts" });
  }
};

export const updateCaption = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;
    const userId = req.user.id;

    const updatedPost = await PostService.updateCaption(
      postId,
      userId,
      caption
    );
    return res.json(updatedPost);
  } catch (err) {
    console.error("updateCaption:", err);
    return res
      .status(400)
      .json({ message: err.message || "Failed to update caption" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    await PostService.deletePost(postId, userId);
    return res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("deletePost:", err);
    return res
      .status(400)
      .json({ message: err.message || "Failed to delete post" });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const result = await PostService.toggleLikePost(postId, userId);
    return res.json(result);
  } catch (err) {
    console.error("toggleLikePost:", err);
    return res
      .status(400)
      .json({ message: err.message || "Failed to toggle like" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const comment = await PostService.addComment(postId, userId, text);
    return res.status(201).json(comment);
  } catch (err) {
    console.error("addComment:", err);
    return res
      .status(400)
      .json({ message: err.message || "Failed to add comment" });
  }
};

export const getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const comments = await PostService.getCommentsForPost(
      postId,
      page,
      limit
    );
    return res.json(comments);
  } catch (err) {
    console.error("getCommentsForPost:", err);
    return res
      .status(400)
      .json({ message: err.message || "Failed to fetch comments" });
  }
};
