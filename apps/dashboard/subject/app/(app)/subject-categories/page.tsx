import SubjectCategoryList from "@/components/subjectCategories/SubjectCategoryList";
import NewSubjectCategoryModal from "@/components/subjectCategories/SubjectCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function SubjectCategories() {
  const { subjectCategories } = await api.subjectCategories.getSubjectCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Subject Categories</h1>
        <NewSubjectCategoryModal />
      </div>
      <SubjectCategoryList subjectCategories={subjectCategories} />
    </main>
  );
}
