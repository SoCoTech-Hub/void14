import AssignmentList from "@/components/assignments/AssignmentList";
import NewAssignmentModal from "@/components/assignments/AssignmentModal";
import { api } from "@/lib/trpc/api";

export default async function Assignments() {
  const { assignments } = await api.assignments.getAssignments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assignments</h1>
        <NewAssignmentModal />
      </div>
      <AssignmentList assignments={assignments} />
    </main>
  );
}
