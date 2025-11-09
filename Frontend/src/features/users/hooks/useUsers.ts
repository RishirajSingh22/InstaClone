import { useEffect, useState } from "react";
import { userAPI } from "@/api/user.api";
import type { User } from "@/types/user.types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userAPI
      .getAll()
      .then((res) => setUsers(res))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
};
