import QuestionDatasetDefinitionList from "@/components/questionDatasetDefinitions/QuestionDatasetDefinitionList";
import NewQuestionDatasetDefinitionModal from "@/components/questionDatasetDefinitions/QuestionDatasetDefinitionModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionDatasetDefinitions() {
  const { questionDatasetDefinitions } = await api.questionDatasetDefinitions.getQuestionDatasetDefinitions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Dataset Definitions</h1>
        <NewQuestionDatasetDefinitionModal />
      </div>
      <QuestionDatasetDefinitionList questionDatasetDefinitions={questionDatasetDefinitions} />
    </main>
  );
}
