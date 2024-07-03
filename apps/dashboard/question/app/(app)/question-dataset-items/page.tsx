import QuestionDatasetItemList from "@/components/questionDatasetItems/QuestionDatasetItemList";
import NewQuestionDatasetItemModal from "@/components/questionDatasetItems/QuestionDatasetItemModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionDatasetItems() {
  const { questionDatasetItems } = await api.questionDatasetItems.getQuestionDatasetItems.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Dataset Items</h1>
        <NewQuestionDatasetItemModal />
      </div>
      <QuestionDatasetItemList questionDatasetItems={questionDatasetItems} />
    </main>
  );
}
