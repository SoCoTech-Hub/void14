import QuestionDatasetList from "@/components/questionDatasets/QuestionDatasetList";
import NewQuestionDatasetModal from "@/components/questionDatasets/QuestionDatasetModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionDatasets() {
  const { questionDatasets } = await api.questionDatasets.getQuestionDatasets.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Datasets</h1>
        <NewQuestionDatasetModal />
      </div>
      <QuestionDatasetList questionDatasets={questionDatasets} />
    </main>
  );
}
