import RoleAllowSwitchList from "@/components/roleAllowSwitches/RoleAllowSwitchList";
import NewRoleAllowSwitchModal from "@/components/roleAllowSwitches/RoleAllowSwitchModal";
import { api } from "@/lib/trpc/api";

export default async function RoleAllowSwitches() {
  const { roleAllowSwitches } = await api.roleAllowSwitches.getRoleAllowSwitches.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Role Allow Switches</h1>
        <NewRoleAllowSwitchModal />
      </div>
      <RoleAllowSwitchList roleAllowSwitches={roleAllowSwitches} />
    </main>
  );
}
