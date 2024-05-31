import UserPasswordHistoryList from "@/components/userPasswordHistories/UserPasswordHistoryList";
import NewUserPasswordHistoryModal from "@/components/userPasswordHistories/UserPasswordHistoryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function UserPasswordHistories() {
  await checkAuth();
  const { userPasswordHistories } = await api.userPasswordHistories.getUserPasswordHistories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Password Histories</h1>
        <NewUserPasswordHistoryModal />
      </div>
      <UserPasswordHistoryList userPasswordHistories={userPasswordHistories} />
    </main>
  );
}
