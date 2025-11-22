import React, { useEffect, useState } from 'react';
import { useCommentModalStore } from '../../store/commentModalStore';
import { useAuthStore } from '../../store/authStore';
import type { Comment } from '../../types/comment.types'; // Assuming you have a comment type
import { postService } from '../../services/post.service';

interface CommentDisplayProps {
  comment: Comment;
}
const CommentDisplay: React.FC<CommentDisplayProps> = ({ comment }) => {
   const avatar = comment.author?.avatar
    ? `${import.meta.env.VITE_API_BASE_URL}${comment.author.avatar}`
    : "https://via.placeholder.com/150";

  // Recursive rendering for nested comments
  return (
    <div className="mb-2 ml-4 border-l pl-2 ">
      <div className='flex'>
      <img src={avatar} alt={comment?.author?.name} className="w-8 h-8 rounded-full mr-3" />
   <p className="text-sm"><span className="font-semibold">{comment?.author?.name}</span> {comment.text}</p>
     </div> 
     <p className='flex justify-end pr-4'>reply</p>
        {comment.replies && comment.replies.map(reply => (
        <CommentDisplay key={reply._id} comment={reply} />
      ))}
    </div>
  );
};

const CommentModal: React.FC = () => {
  const { isModalOpen, currentPostId, closeCommentModal } = useCommentModalStore();
  const { user } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isModalOpen && currentPostId) {
      setLoading(true);
      setError(null);
      postService.getCommentsForPost(currentPostId)
        .then(response => {
          setComments(response);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching comments:', err);
          setError('Failed to load comments.');
          setLoading(false);
        });
    } else {
      setComments([]); // Clear comments when modal is closed
    }
  }, [isModalOpen, currentPostId]);

  if (!isModalOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button onClick={closeCommentModal} className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-grow p-4 overflow-y-auto">
          {loading && <p>Loading comments...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && comments.length === 0 && <p>No comments yet.</p>}
          {!loading && !error && comments.map(comment => (
            <CommentDisplay key={comment._id} comment={comment} />
          ))}
        </div>

        {/* Comment Input (Placeholder) */}
        <div className="p-4 border-t">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CommentModal;