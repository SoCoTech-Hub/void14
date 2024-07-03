import LtiAccessTokenList from "@/components/ltiAccessTokens/LtiAccessTokenList";
import NewLtiAccessTokenModal from "@/components/ltiAccessTokens/LtiAccessTokenModal";
import { api } from "@/lib/trpc/api";

export default async function LtiAccessTokens() {
  const { ltiAccessTokens } = await api.ltiAccessTokens.getLtiAccessTokens.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lti Access Tokens</h1>
        <NewLtiAccessTokenModal />
      </div>
      <LtiAccessTokenList ltiAccessTokens={ltiAccessTokens} />
    </main>
  );
}
