import AssignOverrideList from "@/components/assignOverrides/AssignOverrideList";
import NewAssignOverrideModal from "@/components/assignOverrides/AssignOverrideModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function AssignOverrides() {
  await checkAuth();
  const { assignOverrides } = await api.assignOverrides.getAssignOverrides.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Overrides</h1>
        <NewAssignOverrideModal />
      </div>
      <AssignOverrideList assignOverrides={assignOverrides} />
    </main>
  );
}
