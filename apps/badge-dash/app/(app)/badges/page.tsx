import BadgeList from "@/components/badges/BadgeList";
import NewBadgeModal from "@/components/badges/BadgeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Badges() {
  await checkAuth();
  const { badges } = await api.badges.getBadges.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Badges</h1>
        <NewBadgeModal />
      </div>
      <BadgeList badges={badges} />
    </main>
  );
}
