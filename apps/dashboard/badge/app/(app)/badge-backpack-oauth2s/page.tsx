import BadgeBackpackOauth2List from "@/components/badgeBackpackOauth2s/BadgeBackpackOauth2List";
import NewBadgeBackpackOauth2Modal from "@/components/badgeBackpackOauth2s/BadgeBackpackOauth2Modal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function BadgeBackpackOauth2s() {
  await checkAuth();
  const { badgeBackpackOauth2s } = await api.badgeBackpackOauth2s.getBadgeBackpackOauth2s.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Badge Backpack Oauth2s</h1>
        <NewBadgeBackpackOauth2Modal />
      </div>
      <BadgeBackpackOauth2List badgeBackpackOauth2s={badgeBackpackOauth2s} />
    </main>
  );
}
