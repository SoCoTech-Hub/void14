import Oauth2AccessTokenList from "@/components/oauth2AccessTokens/Oauth2AccessTokenList";
import NewOauth2AccessTokenModal from "@/components/oauth2AccessTokens/Oauth2AccessTokenModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Oauth2AccessTokens() {
  await checkAuth();
  const { oauth2AccessTokens } = await api.oauth2AccessTokens.getOauth2AccessTokens.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Oauth2 Access Tokens</h1>
        <NewOauth2AccessTokenModal />
      </div>
      <Oauth2AccessTokenList oauth2AccessTokens={oauth2AccessTokens} />
    </main>
  );
}
