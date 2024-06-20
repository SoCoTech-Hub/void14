import Oauth2IssuerList from "@/components/oauth2Issuers/Oauth2IssuerList";
import NewOauth2IssuerModal from "@/components/oauth2Issuers/Oauth2IssuerModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Oauth2Issuers() {
  await checkAuth();
  const { oauth2Issuers } = await api.oauth2Issuers.getOauth2Issuers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Oauth2 Issuers</h1>
        <NewOauth2IssuerModal />
      </div>
      <Oauth2IssuerList oauth2Issuers={oauth2Issuers} />
    </main>
  );
}
