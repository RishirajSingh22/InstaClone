export interface Post {
  _id: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  caption: string;
  imageUrl: string;
  likes: string[]; // Array of user IDs who liked the post
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}