import ToolDataprivacyPurposeRoleList from "@/components/toolDataprivacyPurposeRoles/ToolDataprivacyPurposeRoleList";
import NewToolDataprivacyPurposeRoleModal from "@/components/toolDataprivacyPurposeRoles/ToolDataprivacyPurposeRoleModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ToolDataprivacyPurposeRoles() {
  await checkAuth();
  const { toolDataprivacyPurposeRoles } = await api.toolDataprivacyPurposeRoles.getToolDataprivacyPurposeRoles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Dataprivacy Purpose Roles</h1>
        <NewToolDataprivacyPurposeRoleModal />
      </div>
      <ToolDataprivacyPurposeRoleList toolDataprivacyPurposeRoles={toolDataprivacyPurposeRoles} />
    </main>
  );
}
