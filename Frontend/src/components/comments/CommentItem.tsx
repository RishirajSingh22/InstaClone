import React, { useState } from 'react';
import type { Comment } from '../../types/comment.types';
import { formatDistanceToNow } from 'date-fns';
import { useAuthStore } from '../../store/authStore';
import { useCommentStore } from '../../store/commentStore';
import { postService } from '../../services/post.service';

interface CommentItemProps {
  comment: Comment;
  level?: number; // To handle indentation for nested replies
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, level = 0 }) => {
  const { user } = useAuthStore();
  const addReplyToStore = useCommentStore((state) => state.addReply);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleAddReply = async () => {
    if (!user || !replyText.trim()) return;
    try {
      const newReply = await postService.addReplyToComment(comment._id, replyText);
      addReplyToStore(comment._id, newReply);
      setReplyText('');
      setShowReplyInput(false);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div className={`mb-2 ${level > 0 ? 'ml-6' : ''}`}>
      <div className="flex items-start">
        <img
          src={comment.author.avatar || 'https://via.placeholder.com/150'}
          alt={comment.author.username}
          className="w-6 h-6 rounded-full mr-2 mt-1"
        />
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold mr-1">{comment.author.username}</span>
            {comment.text}
          </p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
            {user && (
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="ml-3 font-semibold focus:outline-none"
              >
                Reply
              </button>
            )}
          </div>
          {showReplyInput && user && (
            <div className="mt-2 flex">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Add a reply..."
                className="flex-1 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleAddReply}
                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm focus:outline-none"
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply._id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;