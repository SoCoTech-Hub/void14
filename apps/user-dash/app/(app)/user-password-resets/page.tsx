import UserPasswordResetList from "@/components/userPasswordResets/UserPasswordResetList";
import NewUserPasswordResetModal from "@/components/userPasswordResets/UserPasswordResetModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function UserPasswordResets() {
  await checkAuth();
  const { userPasswordResets } = await api.userPasswordResets.getUserPasswordResets.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Password Resets</h1>
        <NewUserPasswordResetModal />
      </div>
      <UserPasswordResetList userPasswordResets={userPasswordResets} />
    </main>
  );
}
