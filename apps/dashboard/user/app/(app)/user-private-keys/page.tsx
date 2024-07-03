import UserPrivateKeyList from "@/components/userPrivateKeys/UserPrivateKeyList";
import NewUserPrivateKeyModal from "@/components/userPrivateKeys/UserPrivateKeyModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function UserPrivateKeys() {
  await checkAuth();
  const { userPrivateKeys } = await api.userPrivateKeys.getUserPrivateKeys.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Private Keys</h1>
        <NewUserPrivateKeyModal />
      </div>
      <UserPrivateKeyList userPrivateKeys={userPrivateKeys} />
    </main>
  );
}
