import ToolMonitorSubscriptionList from "@/components/toolMonitorSubscriptions/ToolMonitorSubscriptionList";
import NewToolMonitorSubscriptionModal from "@/components/toolMonitorSubscriptions/ToolMonitorSubscriptionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ToolMonitorSubscriptions() {
  await checkAuth();
  const { toolMonitorSubscriptions } = await api.toolMonitorSubscriptions.getToolMonitorSubscriptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Monitor Subscriptions</h1>
        <NewToolMonitorSubscriptionModal />
      </div>
      <ToolMonitorSubscriptionList toolMonitorSubscriptions={toolMonitorSubscriptions} />
    </main>
  );
}
