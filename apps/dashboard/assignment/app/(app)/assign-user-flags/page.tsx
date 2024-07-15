import AssignUserFlagList from "@/components/assignUserFlags/AssignUserFlagList";
import NewAssignUserFlagModal from "@/components/assignUserFlags/AssignUserFlagModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function AssignUserFlags() {
  await checkAuth();
  const { assignUserFlags } = await api.assignUserFlags.getAssignUserFlags.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign User Flags</h1>
        <NewAssignUserFlagModal />
      </div>
      <AssignUserFlagList assignUserFlags={assignUserFlags} />
    </main>
  );
}
