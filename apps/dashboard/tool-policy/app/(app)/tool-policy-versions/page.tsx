import ToolPolicyVersionList from "@/components/toolPolicyVersions/ToolPolicyVersionList";
import NewToolPolicyVersionModal from "@/components/toolPolicyVersions/ToolPolicyVersionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ToolPolicyVersions() {
  await checkAuth();
  const { toolPolicyVersions } = await api.toolPolicyVersions.getToolPolicyVersions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Policy Versions</h1>
        <NewToolPolicyVersionModal />
      </div>
      <ToolPolicyVersionList toolPolicyVersions={toolPolicyVersions} />
    </main>
  );
}
