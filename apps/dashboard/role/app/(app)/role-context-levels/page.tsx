import RoleContextLevelList from "@/components/roleContextLevels/RoleContextLevelList";
import NewRoleContextLevelModal from "@/components/roleContextLevels/RoleContextLevelModal";
import { api } from "@/lib/trpc/api";

export default async function RoleContextLevels() {
  const { roleContextLevels } = await api.roleContextLevels.getRoleContextLevels.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Role Context Levels</h1>
        <NewRoleContextLevelModal />
      </div>
      <RoleContextLevelList roleContextLevels={roleContextLevels} />
    </main>
  );
}
