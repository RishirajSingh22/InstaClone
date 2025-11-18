// src/services/post.service.js
import * as PostRepository from "../repositories/post.repository.js";
import * as CommentRepository from "../repositories/comment.repository.js";

export const createPost = async (authorId, caption, imageUrl) => {
  const post = await PostRepository.createPost({
    author: authorId,
    caption,
    imageUrl,
  });
  return post;
};

export const getAllPosts = async (page, limit) => {
  return PostRepository.findAllPosts(page, limit);
};

export const getPostById = async (postId) => {
  const post = await PostRepository.findPostByIdWithAuthor(postId);
  if (!post) throw new Error("Post not found");
  return post;
};

export const getUserPosts = async (userId, page, limit) => {
  return PostRepository.findPostsByUser(userId, page, limit);
};

export const updateCaption = async (postId, userId, caption) => {
  const post = await PostRepository.findPostById(postId);
  if (!post) throw new Error("Post not found");
  if (post.author.toString() !== userId) {
    throw new Error("Not authorized to update this post");
  }

  const updated = await PostRepository.updatePostCaption(postId, caption);
  return updated;
};

export const deletePost = async (postId, userId) => {
  const post = await PostRepository.findPostById(postId);
  if (!post) throw new Error("Post not found");
  if (post.author.toString() !== userId) {
    throw new Error("Not authorized to delete this post");
  }

  await PostRepository.deletePostById(postId);
};

export const toggleLikePost = async (postId, userId) => {
  const result = await PostRepository.toggleLike(postId, userId);
  if (!result) throw new Error("Post not found");

  const { post, action, isLiked } = result;
  return {
    postId: post._id,
    likesCount: post.likes.length,
    isLiked,
    action,
  };
};

export const addComment = async (postId, userId, text) => {
  const post = await PostRepository.findPostById(postId);
  if (!post) throw new Error("Post not found");

  const comment = await CommentRepository.createComment({
    post: postId,
    author: userId,
    text,
  });

  await PostRepository.incrementCommentsCount(postId);

  return comment;
};

export const getCommentsForPost = async (postId, page, limit) => {
  const post = await PostRepository.findPostById(postId);
  if (!post) throw new Error("Post not found");

  const comments = await CommentRepository.findCommentsByPost(
    postId,
    page,
    limit
  );
  return comments;
};
