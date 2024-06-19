import LtiToolProxyList from "@/components/ltiToolProxies/LtiToolProxyList";
import NewLtiToolProxyModal from "@/components/ltiToolProxies/LtiToolProxyModal";
import { api } from "@/lib/trpc/api";

export default async function LtiToolProxies() {
  const { ltiToolProxies } = await api.ltiToolProxies.getLtiToolProxies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lti Tool Proxies</h1>
        <NewLtiToolProxyModal />
      </div>
      <LtiToolProxyList ltiToolProxies={ltiToolProxies} />
    </main>
  );
}
