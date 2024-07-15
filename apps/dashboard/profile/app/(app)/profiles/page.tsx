import ProfileList from "@/components/profiles/ProfileList";
import NewProfileModal from "@/components/profiles/ProfileModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Profiles() {
  await checkAuth();
  const { profiles } = await api.profiles.getProfiles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Profiles</h1>
        <NewProfileModal />
      </div>
      <ProfileList profiles={profiles} />
    </main>
  );
}
