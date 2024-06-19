import QuestionResponseAnalysiseList from "@/components/questionResponseAnalysises/QuestionResponseAnalysiseList";
import NewQuestionResponseAnalysiseModal from "@/components/questionResponseAnalysises/QuestionResponseAnalysiseModal";
import { api } from "@/lib/trpc/api";

export default async function QuestionResponseAnalysises() {
  const { questionResponseAnalysises } = await api.questionResponseAnalysises.getQuestionResponseAnalysises.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Question Response Analysises</h1>
        <NewQuestionResponseAnalysiseModal />
      </div>
      <QuestionResponseAnalysiseList questionResponseAnalysises={questionResponseAnalysises} />
    </main>
  );
}
