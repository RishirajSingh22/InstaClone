export interface Comment {
  _id: string;
  post: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  text: string;
  parentId?: string;
  replies?: Comment[]; // Nested replies
  createdAt: string;
  updatedAt: string;
}