import Oauth2RefreshTokenList from "@/components/oauth2RefreshTokens/Oauth2RefreshTokenList";
import NewOauth2RefreshTokenModal from "@/components/oauth2RefreshTokens/Oauth2RefreshTokenModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Oauth2RefreshTokens() {
  await checkAuth();
  const { oauth2RefreshTokens } = await api.oauth2RefreshTokens.getOauth2RefreshTokens.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Oauth2 Refresh Tokens</h1>
        <NewOauth2RefreshTokenModal />
      </div>
      <Oauth2RefreshTokenList oauth2RefreshTokens={oauth2RefreshTokens} />
    </main>
  );
}
