import SubjectsSubjectCategoryList from "@/components/subjectsSubjectCategories/SubjectsSubjectCategoryList";
import NewSubjectsSubjectCategoryModal from "@/components/subjectsSubjectCategories/SubjectsSubjectCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function SubjectsSubjectCategories() {
  const { subjectsSubjectCategories } = await api.subjectsSubjectCategories.getSubjectsSubjectCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Subjects Subject Categories</h1>
        <NewSubjectsSubjectCategoryModal />
      </div>
      <SubjectsSubjectCategoryList subjectsSubjectCategories={subjectsSubjectCategories} />
    </main>
  );
}
