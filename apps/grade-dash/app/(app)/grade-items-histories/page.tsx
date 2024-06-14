import GradeItemsHistoryList from "@/components/gradeItemsHistories/GradeItemsHistoryList";
import NewGradeItemsHistoryModal from "@/components/gradeItemsHistories/GradeItemsHistoryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function GradeItemsHistories() {
  await checkAuth();
  const { gradeItemsHistories } = await api.gradeItemsHistories.getGradeItemsHistories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Items Histories</h1>
        <NewGradeItemsHistoryModal />
      </div>
      <GradeItemsHistoryList gradeItemsHistories={gradeItemsHistories} />
    </main>
  );
}
