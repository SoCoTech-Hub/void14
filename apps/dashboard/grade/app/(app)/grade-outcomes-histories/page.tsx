import GradeOutcomesHistoryList from "@/components/gradeOutcomesHistories/GradeOutcomesHistoryList";
import NewGradeOutcomesHistoryModal from "@/components/gradeOutcomesHistories/GradeOutcomesHistoryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function GradeOutcomesHistories() {
  await checkAuth();
  const { gradeOutcomesHistories } = await api.gradeOutcomesHistories.getGradeOutcomesHistories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Outcomes Histories</h1>
        <NewGradeOutcomesHistoryModal />
      </div>
      <GradeOutcomesHistoryList gradeOutcomesHistories={gradeOutcomesHistories} />
    </main>
  );
}
