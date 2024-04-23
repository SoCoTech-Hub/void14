import LocalizationUserList from "@/components/localizationUsers/LocalizationUserList";
import NewLocalizationUserModal from "@/components/localizationUsers/LocalizationUserModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function LocalizationUsers() {
  await checkAuth();
  const { localizationUsers } = await api.localizationUsers.getLocalizationUsers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Localization Users</h1>
        <NewLocalizationUserModal />
      </div>
      <LocalizationUserList localizationUsers={localizationUsers} />
    </main>
  );
}
