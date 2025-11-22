import React, { useEffect, useState, useMemo } from "react";
import type { Post } from "../../types/post.types";
import { useAuthStore } from "../../store/authStore";
import { postService } from "../../services/post.service";
import { formatDistanceToNow } from "date-fns";
import { usePostStore } from "../../store/postStore";
import { useCommentModalStore } from "../../store/commentModalStore";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuthStore();
  const { updatePostLikes } = usePostStore();
  const { openCommentModal } = useCommentModalStore();
  const liked = post.likes.includes(user?._id || "");

  const imageSrc = post.imageUrl
    ? `http://localhost:5000${post.imageUrl}`
    : "https://via.placeholder.com/500";
  const avatar = post.author.avatar
    ? `http://localhost:5000${post.author.avatar}`
    : "https://via.placeholder.com/150";
  const handleLikeToggle = async () => {
    if (!user) return; // optionally show toast / redirect to login

    try {
      await postService.toggleLikePost(post._id);
      // if you later add a global store update, call it here
      updatePostLikes(post._id, user._id);
    } catch (error) {
      console.error("Error toggling like:", error);
      // rollback on error
      // setLiked(!next);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-md mb-4">
      {/* Post Header */}
      <div className="flex items-center p-3">
        <img
          src={avatar}
          alt={post.author.name}
          className="w-8 h-8 rounded-full mr-3"
        />
        <span className="font-semibold text-sm">{post.author.name}</span>
      </div>

      {/* Post Image */}
      <img src={imageSrc} alt={post.caption} className="w-full object-cover" />

      {/* Post Actions */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleLikeToggle}
            className="mr-3 focus:outline-none"
            aria-label={liked ? "Unlike" : "Like"}
          >
            {liked ? (
              // filled red heart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            ) : (
              // outlined gray heart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>

          {/* Comment Icon (placeholder) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => openCommentModal(post._id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <span className="text-sm text-gray-500">{post.likes.length} likes</span>
      </div>

      {/* Post Caption */}
      <div className="px-3 pb-2">
        <p className="text-sm">
          <span className="font-semibold mr-1">{post.author.name}</span>
          {post.caption}
        </p>
      </div>

      {/* Post Comments (Placeholder) */}
      <div className="px-3 pb-2">
        {post.commentsCount > 0 && (
          <button className="text-sm text-gray-500 focus:outline-none">
            View all {post.commentsCount} comments
          </button>
        )}
        <div className="mt-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full text-sm bordera_none focus:ring-0 cursor-pointer"
            onClick={() => openCommentModal(post._id)}
            readOnly
          />
        </div>
      </div>

      {/* Post Timestamp */}
      <div className="px-3 pb-3">
        <span className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
