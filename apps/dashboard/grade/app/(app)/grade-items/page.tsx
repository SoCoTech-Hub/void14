import GradeItemList from "@/components/gradeItems/GradeItemList";
import NewGradeItemModal from "@/components/gradeItems/GradeItemModal";
import { api } from "@/lib/trpc/api";

export default async function GradeItems() {
  const { gradeItems } = await api.gradeItems.getGradeItems.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Items</h1>
        <NewGradeItemModal />
      </div>
      <GradeItemList gradeItems={gradeItems} />
    </main>
  );
}
