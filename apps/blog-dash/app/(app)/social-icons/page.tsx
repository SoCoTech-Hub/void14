import SocialIconList from "@/components/socialIcons/SocialIconList";
import NewSocialIconModal from "@/components/socialIcons/SocialIconModal";
import { api } from "@/lib/trpc/api";

export default async function SocialIcons() {
  const { socialIcons } = await api.socialIcons.getSocialIcons.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Social Icons</h1>
        <NewSocialIconModal />
      </div>
      <SocialIconList socialIcons={socialIcons} />
    </main>
  );
}
