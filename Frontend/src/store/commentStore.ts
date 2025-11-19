import { create } from 'zustand';
import type { Comment } from '../types/comment.types';

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  addReply: (parentCommentId: string, reply: Comment) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  loading: false,
  error: null,
  setComments: (comments) => set({ comments, loading: false, error: null }),
  addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
  addReply: (parentCommentId, reply) =>
    set((state) => ({
      comments: state.comments.map((comment) => {
        if (comment._id === parentCommentId) {
          return {
            ...comment,
            replies: comment.replies ? [...comment.replies, reply] : [reply],
          };
        }
        return comment;
      }),
    })),
}));