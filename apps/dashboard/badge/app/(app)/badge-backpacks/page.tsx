import BadgeBackpackList from "@/components/badgeBackpacks/BadgeBackpackList";
import NewBadgeBackpackModal from "@/components/badgeBackpacks/BadgeBackpackModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function BadgeBackpacks() {
  await checkAuth();
  const { badgeBackpacks } = await api.badgeBackpacks.getBadgeBackpacks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Badge Backpacks</h1>
        <NewBadgeBackpackModal />
      </div>
      <BadgeBackpackList badgeBackpacks={badgeBackpacks} />
    </main>
  );
}
