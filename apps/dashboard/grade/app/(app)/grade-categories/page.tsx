import GradeCategoryList from "@/components/gradeCategories/GradeCategoryList";
import NewGradeCategoryModal from "@/components/gradeCategories/GradeCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function GradeCategories() {
  const { gradeCategories } = await api.gradeCategories.getGradeCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Grade Categories</h1>
        <NewGradeCategoryModal />
      </div>
      <GradeCategoryList gradeCategories={gradeCategories} />
    </main>
  );
}
