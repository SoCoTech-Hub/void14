import UserList from "@/components/users/UserList";
import NewUserModal from "@/components/users/UserModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Users() {
  await checkAuth();
  const { users } = await api.users.getUsers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Users</h1>
        <NewUserModal />
      </div>
      <UserList users={users} />
    </main>
  );
}
