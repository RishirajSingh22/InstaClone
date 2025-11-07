import { User } from "@/types/user.types";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
  );
};

export default UserCard;
