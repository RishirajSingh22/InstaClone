// src/repositories/post.repository.js
import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const createPost = (data) => {
  return Post.create(data);
};

export const findPostById = (postId) => {
  return Post.findById(postId);
};

export const findPostByIdWithAuthor = (postId) => {
  return Post.findById(postId).populate("author", "username avatar");
};

export const updatePostCaption = (postId, caption) => {
  return Post.findByIdAndUpdate(
    postId,
    { caption },
    { new: true }
  );
};

export const deletePostById = (postId) => {
  return Post.findByIdAndDelete(postId);
};

export const findAllPosts = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return Post.find()
    .populate("author", "username avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const findPostsByUser = (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return Post.find({ author: userId })
    .populate("author", "username avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const toggleLike = async (postId, userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const post = await Post.findById(postId);
  if (!post) return null;

  const alreadyLiked = post.likes.some((id) => id.equals(userObjectId));

  let action;
  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => !id.equals(userObjectId));
    action = "unliked";
    console.log("unliked")
  } else {
    post.likes.push(userObjectId);
    action = "liked";
    console.log("liked")

  }

  await post.save();

  return {
    post,
    action,
    isLiked: !alreadyLiked
  };
};

export const incrementCommentsCount = (postId) => {
  return Post.findByIdAndUpdate(
    postId,
    { $inc: { commentsCount: 1 } },
    { new: true }
  );
};

export const decrementCommentsCount = (postId) => {
  return Post.findByIdAndUpdate(
    postId,
    { $inc: { commentsCount: -1 } },
    { new: true }
  );
};
