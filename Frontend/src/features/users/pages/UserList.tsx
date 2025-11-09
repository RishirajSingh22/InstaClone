import { useEffect, useState } from "react";
import { userAPI } from "@/api/user.api";
import UserCard from "../components/UserCard";
import type { User } from "@/types/user.types";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userAPI.getAll().then(setUsers).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <UserCard key={u._id} user={u} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
