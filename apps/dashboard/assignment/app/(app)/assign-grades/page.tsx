import AssignGradeList from "@/components/assignGrades/AssignGradeList";
import NewAssignGradeModal from "@/components/assignGrades/AssignGradeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function AssignGrades() {
  await checkAuth();
  const { assignGrades } = await api.assignGrades.getAssignGrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Assign Grades</h1>
        <NewAssignGradeModal />
      </div>
      <AssignGradeList assignGrades={assignGrades} />
    </main>
  );
}
