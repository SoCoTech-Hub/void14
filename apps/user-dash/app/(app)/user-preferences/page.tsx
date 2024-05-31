import UserPreferenceList from "@/components/userPreferences/UserPreferenceList";
import NewUserPreferenceModal from "@/components/userPreferences/UserPreferenceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function UserPreferences() {
  await checkAuth();
  const { userPreferences } = await api.userPreferences.getUserPreferences.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Preferences</h1>
        <NewUserPreferenceModal />
      </div>
      <UserPreferenceList userPreferences={userPreferences} />
    </main>
  );
}
