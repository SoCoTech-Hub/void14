import GradeGradesHistoryList from "@/components/gradeGradesHistories/GradeGradesHistoryList";
import NewGradeGradesHistoryModal from "@/components/gradeGradesHistories/GradeGradesHistoryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function GradeGradesHistories() {
  await checkAuth();
  const { gradeGradesHistories } = await api.gradeGradesHistories.getGradeGradesHistories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Grades Histories</h1>
        <NewGradeGradesHistoryModal />
      </div>
      <GradeGradesHistoryList gradeGradesHistories={gradeGradesHistories} />
    </main>
  );
}
