import RoleAssignmentList from "@/components/roleAssignments/RoleAssignmentList";
import NewRoleAssignmentModal from "@/components/roleAssignments/RoleAssignmentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function RoleAssignments() {
  await checkAuth();
  const { roleAssignments } = await api.roleAssignments.getRoleAssignments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Role Assignments</h1>
        <NewRoleAssignmentModal />
      </div>
      <RoleAssignmentList roleAssignments={roleAssignments} />
    </main>
  );
}
