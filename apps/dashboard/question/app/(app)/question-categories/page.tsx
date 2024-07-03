import QuestionCategoryList from "@/components/questionCategories/QuestionCategoryList";
import NewQuestionCategoryModal from "@/components/questionCategories/QuestionCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionCategories() {
  const { questionCategories } = await api.questionCategories.getQuestionCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Categories</h1>
        <NewQuestionCategoryModal />
      </div>
      <QuestionCategoryList questionCategories={questionCategories} />
    </main>
  );
}
