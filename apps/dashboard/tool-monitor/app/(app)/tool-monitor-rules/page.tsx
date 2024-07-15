import ToolMonitorRuleList from "@/components/toolMonitorRules/ToolMonitorRuleList";
import NewToolMonitorRuleModal from "@/components/toolMonitorRules/ToolMonitorRuleModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ToolMonitorRules() {
  await checkAuth();
  const { toolMonitorRules } = await api.toolMonitorRules.getToolMonitorRules.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Monitor Rules</h1>
        <NewToolMonitorRuleModal />
      </div>
      <ToolMonitorRuleList toolMonitorRules={toolMonitorRules} />
    </main>
  );
}
