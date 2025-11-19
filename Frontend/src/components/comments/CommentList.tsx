import React, { useEffect } from 'react';
import { useCommentStore } from '../../store/commentStore';
import { postService } from '../../services/post.service';
import CommentItem from './CommentItem';

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { comments, setComments, loading, error } = useCommentStore();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Set loading to true before fetching
        setComments([]); // Clear previous comments
        const fetchedComments = await postService.getCommentsForPost(postId);
        setComments(fetchedComments);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
        // Optionally set an error state in the store
      }
    };

    fetchComments();
  }, [postId, setComments]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-4">
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentList;