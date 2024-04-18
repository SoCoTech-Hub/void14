import SocialShareList from "@/components/socialShares/SocialShareList";
import NewSocialShareModal from "@/components/socialShares/SocialShareModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function SocialShares() {
  await checkAuth();
  const { socialShares } = await api.socialShares.getSocialShares.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Social Shares</h1>
        <NewSocialShareModal />
      </div>
      <SocialShareList socialShares={socialShares} />
    </main>
  );
}
