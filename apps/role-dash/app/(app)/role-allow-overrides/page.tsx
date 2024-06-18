import RoleAllowOverrideList from "@/components/roleAllowOverrides/RoleAllowOverrideList";
import NewRoleAllowOverrideModal from "@/components/roleAllowOverrides/RoleAllowOverrideModal";
import { api } from "@/lib/trpc/api";

export default async function RoleAllowOverrides() {
  const { roleAllowOverrides } = await api.roleAllowOverrides.getRoleAllowOverrides.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Role Allow Overrides</h1>
        <NewRoleAllowOverrideModal />
      </div>
      <RoleAllowOverrideList roleAllowOverrides={roleAllowOverrides} />
    </main>
  );
}
