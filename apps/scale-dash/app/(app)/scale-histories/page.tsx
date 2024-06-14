import ScaleHistoryList from "@/components/scaleHistories/ScaleHistoryList";
import NewScaleHistoryModal from "@/components/scaleHistories/ScaleHistoryModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function ScaleHistories() {
  await checkAuth();
  const { scaleHistories } = await api.scaleHistories.getScaleHistories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scale Histories</h1>
        <NewScaleHistoryModal />
      </div>
      <ScaleHistoryList scaleHistories={scaleHistories} />
    </main>
  );
}
