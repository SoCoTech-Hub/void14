import RoleAllowAssignList from "@/components/roleAllowAssigns/RoleAllowAssignList";
import NewRoleAllowAssignModal from "@/components/roleAllowAssigns/RoleAllowAssignModal";
import { api } from "@/lib/trpc/api";

export default async function RoleAllowAssigns() {
  const { roleAllowAssigns } = await api.roleAllowAssigns.getRoleAllowAssigns.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Role Allow Assigns</h1>
        <NewRoleAllowAssignModal />
      </div>
      <RoleAllowAssignList roleAllowAssigns={roleAllowAssigns} />
    </main>
  );
}
