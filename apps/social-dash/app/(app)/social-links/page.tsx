import SocialLinkList from "@/components/socialLinks/SocialLinkList";
import NewSocialLinkModal from "@/components/socialLinks/SocialLinkModal";
import { api } from "@/lib/trpc/api";

export default async function SocialLinks() {
  const { socialLinks } = await api.socialLinks.getSocialLinks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Social Links</h1>
        <NewSocialLinkModal />
      </div>
      <SocialLinkList socialLinks={socialLinks} />
    </main>
  );
}
