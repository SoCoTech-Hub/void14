import Oauth2UserFieldMappingList from "@/components/oauth2UserFieldMappings/Oauth2UserFieldMappingList";
import NewOauth2UserFieldMappingModal from "@/components/oauth2UserFieldMappings/Oauth2UserFieldMappingModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Oauth2UserFieldMappings() {
  await checkAuth();
  const { oauth2UserFieldMappings } = await api.oauth2UserFieldMappings.getOauth2UserFieldMappings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Oauth2 User Field Mappings</h1>
        <NewOauth2UserFieldMappingModal />
      </div>
      <Oauth2UserFieldMappingList oauth2UserFieldMappings={oauth2UserFieldMappings} />
    </main>
  );
}
