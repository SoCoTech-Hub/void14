import RoleNameList from "@/components/roleNames/RoleNameList";
import NewRoleNameModal from "@/components/roleNames/RoleNameModal";
import { api } from "@/lib/trpc/api";

export default async function RoleNames() {
  const { roleNames } = await api.roleNames.getRoleNames.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Role Names</h1>
        <NewRoleNameModal />
      </div>
      <RoleNameList roleNames={roleNames} />
    </main>
  );
}
