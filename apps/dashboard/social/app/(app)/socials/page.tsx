import SocialList from "@/components/socials/SocialList";
import NewSocialModal from "@/components/socials/SocialModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Socials() {
  await checkAuth();
  const { socials } = await api.socials.getSocials.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Socials</h1>
        <NewSocialModal />
      </div>
      <SocialList socials={socials} />
    </main>
  );
}
