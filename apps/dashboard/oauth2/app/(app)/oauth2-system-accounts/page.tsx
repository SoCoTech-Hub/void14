import Oauth2SystemAccountList from "@/components/oauth2SystemAccounts/Oauth2SystemAccountList";
import NewOauth2SystemAccountModal from "@/components/oauth2SystemAccounts/Oauth2SystemAccountModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Oauth2SystemAccounts() {
  await checkAuth();
  const { oauth2SystemAccounts } = await api.oauth2SystemAccounts.getOauth2SystemAccounts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Oauth2 System Accounts</h1>
        <NewOauth2SystemAccountModal />
      </div>
      <Oauth2SystemAccountList oauth2SystemAccounts={oauth2SystemAccounts} />
    </main>
  );
}
