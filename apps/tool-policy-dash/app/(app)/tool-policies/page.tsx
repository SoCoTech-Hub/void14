import ToolPolicyList from "@/components/toolPolicies/ToolPolicyList";
import NewToolPolicyModal from "@/components/toolPolicies/ToolPolicyModal";
import { api } from "@/lib/trpc/api";

export default async function ToolPolicies() {
  const { toolPolicies } = await api.toolPolicies.getToolPolicies.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Policies</h1>
        <NewToolPolicyModal />
      </div>
      <ToolPolicyList toolPolicies={toolPolicies} />
    </main>
  );
}
