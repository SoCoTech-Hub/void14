import RoleCapabilityList from "@/components/roleCapabilities/RoleCapabilityList";
import NewRoleCapabilityModal from "@/components/roleCapabilities/RoleCapabilityModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function RoleCapabilities() {
  await checkAuth();
  const { roleCapabilities } = await api.roleCapabilities.getRoleCapabilities.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Role Capabilities</h1>
        <NewRoleCapabilityModal />
      </div>
      <RoleCapabilityList roleCapabilities={roleCapabilities} />
    </main>
  );
}
