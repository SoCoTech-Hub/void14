import UserLastAccessList from "@/components/userLastAccesses/UserLastAccessList";
import NewUserLastAccessModal from "@/components/userLastAccesses/UserLastAccessModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function UserLastAccesses() {
  await checkAuth();
  const { userLastAccesses } = await api.userLastAccesses.getUserLastAccesses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Last Accesses</h1>
        <NewUserLastAccessModal />
      </div>
      <UserLastAccessList userLastAccesses={userLastAccesses} />
    </main>
  );
}
