import { create } from "zustand";
import type { Post } from "../types/post.types";
// import axiosClient from "../api/axiosClient"; // abhi nahi chahiye yahan

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePostLikes: (postId: string, userId: string) => void; // <- yahan userId bhi
}

export const usePostStore = create<PostState>()((set) => ({
  posts: [],
  loading: false,
  error: null,

  setPosts: (posts) => set({ posts, loading: false, error: null }),

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),

  // 🟢 Toggle like logic (local state only)
  updatePostLikes: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post._id !== postId) return post;

        const alreadyLiked = post.likes.includes(userId);

        return {
          ...post,
          likes: alreadyLiked
            ? post.likes.filter((id) => id !== userId) // remove like
            : [...post.likes, userId], // add like
        };
      }),
    })),
}));
