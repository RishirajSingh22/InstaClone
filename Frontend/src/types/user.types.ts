export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// types/auth.types.ts or similar
export interface UserFormData {
  name?: string;
  email: string;
  password: string;
}
