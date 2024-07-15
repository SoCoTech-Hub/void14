import SocialReactionList from "@/components/socialReactions/SocialReactionList";
import NewSocialReactionModal from "@/components/socialReactions/SocialReactionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function SocialReactions() {
  await checkAuth();
  const { socialReactions } = await api.socialReactions.getSocialReactions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Social Reactions</h1>
        <NewSocialReactionModal />
      </div>
      <SocialReactionList socialReactions={socialReactions} />
    </main>
  );
}
