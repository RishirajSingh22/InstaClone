import React, { useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import { postService } from '../services/post.service';
import PostCard from '../components/posts/PostCard';

const Home: React.FC = () => {
  const { posts, setPosts, loading, error } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      // Optionally set loading state here if not handled by setPosts
      try {
        const fetchedPosts = await postService.getAllPosts();
        console.log('Fetched posts:', fetchedPosts);
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        // Optionally set an error state in the store
      }
    };

    fetchPosts();
  }, [setPosts]);

  if (loading) return <div className="text-center mt-8">Loading posts...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No posts available.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Home;
