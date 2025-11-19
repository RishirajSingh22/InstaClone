import axiosClient from '../api/axiosClient';
import type { Post } from '../types/post.types';
import type { Comment } from '../types/comment.types';

export const postService = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await axiosClient.get('/posts');
    return response.data;
  },

  getCommentsForPost: async (postId: string): Promise<Comment[]> => {
    const response = await axiosClient.get(`/posts/${postId}/comments`);
    return response.data;
  },

  addComment: async (postId: string, text: string): Promise<Comment> => {
    const response = await axiosClient.post(`/posts/${postId}/comments`, { text });
    return response.data;
  },

  addReplyToComment: async (commentId: string, text: string): Promise<Comment> => {
    const response = await axiosClient.post(`/comments/${commentId}/replies`, { text });
    return response.data;
  },

  toggleLikePost: async (postId: string): Promise<{ postId: string; likesCount: number; isLiked: boolean; action: string }> => {
    const response = await axiosClient.post(`/posts/${postId}/toggle-like`);
    return response.data;
  },

  // Add other post-related services as needed (e.g., createPost, deletePost, updatePost)
};