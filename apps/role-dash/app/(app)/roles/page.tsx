import RoleList from "@/components/roles/RoleList";
import NewRoleModal from "@/components/roles/RoleModal";
import { api } from "@/lib/trpc/api";

export default async function Roles() {
  const { roles } = await api.roles.getRoles.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Roles</h1>
        <NewRoleModal />
      </div>
      <RoleList roles={roles} />
    </main>
  );
}
