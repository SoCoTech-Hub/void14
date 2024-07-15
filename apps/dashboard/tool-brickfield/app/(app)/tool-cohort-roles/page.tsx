import ToolCohortRoleList from "@/components/toolCohortRoles/ToolCohortRoleList";
import NewToolCohortRoleModal from "@/components/toolCohortRoles/ToolCohortRoleModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ToolCohortRoles() {
  await checkAuth();
  const { toolCohortRoles } = await api.toolCohortRoles.getToolCohortRoles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Cohort Roles</h1>
        <NewToolCohortRoleModal />
      </div>
      <ToolCohortRoleList toolCohortRoles={toolCohortRoles} />
    </main>
  );
}
