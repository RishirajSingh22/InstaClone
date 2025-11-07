import axiosClient from "./axiosClient";
import { User } from "@/types/user.types";

export const userAPI = {
  getAll: (): Promise<User[]> => axiosClient.get("/users"),
  getById: (id: string): Promise<User> => axiosClient.get(`/users/${id}`),
  create: (data: User) => axiosClient.post("/users", data),
  delete: (id: string) => axiosClient.delete(`/users/${id}`),
};
