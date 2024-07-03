import GradeCategoriesHistoryList from "@/components/gradeCategoriesHistories/GradeCategoriesHistoryList";
import NewGradeCategoriesHistoryModal from "@/components/gradeCategoriesHistories/GradeCategoriesHistoryModal";
import { api } from "@/lib/trpc/api";

export default async function GradeCategoriesHistories() {
  const { gradeCategoriesHistories } = await api.gradeCategoriesHistories.getGradeCategoriesHistories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Categories Histories</h1>
        <NewGradeCategoriesHistoryModal />
      </div>
      <GradeCategoriesHistoryList gradeCategoriesHistories={gradeCategoriesHistories} />
    </main>
  );
}
