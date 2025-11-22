import { create } from 'zustand';

interface CommentModalState {
  isModalOpen: boolean;
  currentPostId: string | null;
  openCommentModal: (postId: string) => void;
  closeCommentModal: () => void;
}

export const useCommentModalStore = create<CommentModalState>((set) => ({
  isModalOpen: false,
  currentPostId: null,
  openCommentModal: (postId) => set({ isModalOpen: true, currentPostId: postId }),
  closeCommentModal: () => set({ isModalOpen: false, currentPostId: null }),
}));