import ExternalTokenList from "@/components/externalTokens/ExternalTokenList";
import NewExternalTokenModal from "@/components/externalTokens/ExternalTokenModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ExternalTokens() {
  await checkAuth();
  const { externalTokens } = await api.externalTokens.getExternalTokens.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">External Tokens</h1>
        <NewExternalTokenModal />
      </div>
      <ExternalTokenList externalTokens={externalTokens} />
    </main>
  );
}
