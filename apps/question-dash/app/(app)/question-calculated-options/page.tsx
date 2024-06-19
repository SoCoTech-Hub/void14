import QuestionCalculatedOptionList from "@/components/questionCalculatedOptions/QuestionCalculatedOptionList";
import NewQuestionCalculatedOptionModal from "@/components/questionCalculatedOptions/QuestionCalculatedOptionModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionCalculatedOptions() {
  const { questionCalculatedOptions } = await api.questionCalculatedOptions.getQuestionCalculatedOptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Calculated Options</h1>
        <NewQuestionCalculatedOptionModal />
      </div>
      <QuestionCalculatedOptionList questionCalculatedOptions={questionCalculatedOptions} />
    </main>
  );
}
