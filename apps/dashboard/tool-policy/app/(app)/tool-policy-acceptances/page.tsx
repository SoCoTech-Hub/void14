import ToolPolicyAcceptanceList from "@/components/toolPolicyAcceptances/ToolPolicyAcceptanceList";
import NewToolPolicyAcceptanceModal from "@/components/toolPolicyAcceptances/ToolPolicyAcceptanceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ToolPolicyAcceptances() {
  await checkAuth();
  const { toolPolicyAcceptances } = await api.toolPolicyAcceptances.getToolPolicyAcceptances.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Policy Acceptances</h1>
        <NewToolPolicyAcceptanceModal />
      </div>
      <ToolPolicyAcceptanceList toolPolicyAcceptances={toolPolicyAcceptances} />
    </main>
  );
}
