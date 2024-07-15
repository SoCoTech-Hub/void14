import AssignUserMappingList from "@/components/assignUserMappings/AssignUserMappingList";
import NewAssignUserMappingModal from "@/components/assignUserMappings/AssignUserMappingModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function AssignUserMappings() {
  await checkAuth();
  const { assignUserMappings } = await api.assignUserMappings.getAssignUserMappings.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign User Mappings</h1>
        <NewAssignUserMappingModal />
      </div>
      <AssignUserMappingList assignUserMappings={assignUserMappings} />
    </main>
  );
}
